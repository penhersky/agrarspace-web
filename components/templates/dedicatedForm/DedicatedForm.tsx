import { Button, Drawer, Form, Space } from "antd";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React from "react";

import { Loading } from "../../shared";
import styles from "./dedicatedForm.module.less";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-unused-vars */
interface IFormProps<T> {
  onFinish: (values: T, refreshForm: (fields?: string[]) => void) => void;
  visible: boolean;
  onHidden: () => void;
  title: string;
  children: React.ReactNode;
  submitButtonText?: string;
  loading?: boolean;
}
/* eslint-enable no-unused-vars */

const PlantationInput = <T extends {}>({
  onFinish,
  visible,
  onHidden,
  title,
  children,
  submitButtonText,
  loading,
}: IFormProps<T>) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const handleCloseDrawer = () => {
    form.resetFields();
    onHidden();
  };
  const handleFinishDrawer = (value: T) => {
    onFinish(value, form.resetFields);
  };

  return (
    <Drawer
      placement="right"
      onClose={handleCloseDrawer}
      visible={visible}
      title={title}
      size="large"
    >
      <div className={clsx(styles.container, loading ? "disabled" : "")}>
        {loading && (
          <div className={styles.loadingArea}>
            <Loading />
          </div>
        )}
        <Form
          labelCol={layout.labelCol}
          wrapperCol={layout.wrapperCol}
          name="plantation-input"
          onFinish={handleFinishDrawer}
          form={form}
          validateMessages={t("validation:form", { returnObjects: true })}
        >
          {children}

          <Form.Item
            wrapperCol={{ offset: 4 }}
            className={loading ? "disabled" : ""}
          >
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                {submitButtonText || t("actions:create")}
              </Button>
              <Button htmlType="button" onClick={handleCloseDrawer}>
                {t("actions:cancel")}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
};

export default PlantationInput;
