import { useLazyQuery } from "@apollo/client";
import { Button, Form, Input, Typography } from "antd";
import clsx from "clsx";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

import { PageProvider } from "../../../components/providers";
import { OZ_ROUTES } from "../../../constants/navigation";
import {
  ISignInResultResult,
  ISingInOrganizationVariables,
} from "../../../models/auth.model";
import getInitialProps from "../../../services/initialProps/singInOrganization.service";
import { SING_IN_TO_ORGANIZATION } from "../../../services/schemas/auth.schema";
import styles from "../../../styles/auth.module.less";
import { useDevice } from "../../../utils/device";
import { setTokenDate } from "../../../utils/token";

const OrganizationLogin: NextPage<{ organizationId: string }> = ({
  organizationId,
}) => {
  const router = useRouter();
  const { getOs } = useDevice();
  const { t } = useTranslation("auth");

  const [singIn, { loading, data, error }] = useLazyQuery<
    ISignInResultResult,
    ISingInOrganizationVariables
  >(SING_IN_TO_ORGANIZATION);

  const onFinish = (values: {
    organizationPassword: string;
    organizationUsername: string;
  }) => {
    singIn({
      variables: {
        data: {
          organizationId: +organizationId,
          name: values.organizationUsername,
          password: values.organizationPassword,
        },
        info: {
          browser: "",
          details: "",
          os: getOs(),
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      setTokenDate("device", {
        token: data.signInToOrganization.token,
        expiresIn: data.signInToOrganization.expiresIn,
      });
      router.replace(OZ_ROUTES.dashboard);
    }
  }, [data, router]);

  return (
    <PageProvider>
      <main className={styles.container}>
        <Form
          name="OrganizationLogin"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className={styles.form}
        >
          <div className={styles.info}>
            <Typography.Title level={3} className={styles.title}>
              {t("singIn")}
            </Typography.Title>

            <div
              className={clsx(
                styles.formMessage,
                error ? styles.error : styles.noError
              )}
            >
              <Typography.Text type="danger">
                {t("message.defaultError")}
              </Typography.Text>
            </div>
          </div>

          <Form.Item
            label={t("userName")}
            name="organizationUsername"
            rules={[{ required: true, message: t("validation.required") }]}
          >
            <Input disabled={loading} />
          </Form.Item>

          <Form.Item
            label={t("password")}
            name="organizationPassword"
            rules={[{ required: true, message: t("validation.required") }]}
          >
            <Input.Password disabled={loading} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t("singIn")}
            </Button>
          </Form.Item>
        </Form>
      </main>
    </PageProvider>
  );
};

export const getServerSideProps = getInitialProps;

export default OrganizationLogin;
