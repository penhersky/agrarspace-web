import { DocumentNode, useMutation } from "@apollo/client";
import { Form, Input, InputNumber, message } from "antd";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import { IPlantation } from "../../../../models/entity.model";
import { DedicatedForm } from "../../../templates";

interface ICreatePlantation {
  data: {
    name: string;
    status?: string;
    areaSize: number;
    region: string;
    description?: string;
  };
}

interface ICreatePlantationResult {
  createPlantation: {
    id: number;
  };
}

/* eslint-disable no-unused-vars */
interface IFormProps {
  visible: boolean;
  title: string;
  onHidden: () => void;
  onRefresh: () => void;
  schema: DocumentNode;
}
/* eslint-enable no-unused-vars */

const PlantationInput: React.FC<IFormProps> = ({
  title,
  visible,
  onHidden,
  schema,
  onRefresh,
}) => {
  const [create, { loading }] = useMutation<
    ICreatePlantationResult,
    ICreatePlantation
  >(schema, { errorPolicy: "all" });
  const [loaded, setLoaded] = useState(!loading);
  const { t } = useTranslation("organization");

  const handleCreate = async (
    plantation: IPlantation,
    refreshForm: () => void
  ) => {
    const { data, errors } = await create({
      variables: {
        data: plantation,
      },
    });
    setLoaded(true);
    if (!data?.createPlantation?.id && errors)
      message.error(t("message:default:error:title"));
    if (data?.createPlantation.id) {
      message.success(t("plantation.added"));
      refreshForm();
      onRefresh();
      onHidden();
    }
  };

  return (
    <DedicatedForm
      visible={visible}
      title={title}
      onFinish={handleCreate}
      onHidden={onHidden}
      loading={!loaded}
    >
      <Form.Item
        name={["name"]}
        label={t("plantation.name")}
        rules={[{ required: true, max: 124, min: 4 }]}
      >
        <Input name="plantation-name" />
      </Form.Item>
      <Form.Item
        name={["region"]}
        label={t("plantation.region")}
        rules={[{ required: true, max: 256, min: 4 }]}
      >
        <Input name="plantation-region" />
      </Form.Item>
      <Form.Item
        name={["areaSize"]}
        label={t("plantation.area")}
        rules={[{ required: true, type: "number", min: 0.001, max: 999999 }]}
      >
        <InputNumber name="plantation-area" step="0.1" />
      </Form.Item>
      <Form.Item
        name={["description"]}
        label={t("plantation.description")}
        rules={[{ required: false, max: 900 }]}
      >
        <Input.TextArea name="plantation-description" />
      </Form.Item>
    </DedicatedForm>
  );
};

export default PlantationInput;
