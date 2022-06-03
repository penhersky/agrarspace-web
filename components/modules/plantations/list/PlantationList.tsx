import { useMutation } from "@apollo/client";
import { message, Modal } from "antd";
import { TFunction, useTranslation } from "next-i18next";
import React, { useState } from "react";

import { IPlantation } from "../../../../models/entity.model";
import { IPagination, ISort } from "../../../../models/list.model";
import { DELETE_PLANTATION } from "../../../../services/schemas/plantation.schema";
import { formatNumber } from "../../../../utils/valueFormate";
import { Table } from "../../../templates";
import { IDeleteParams, IDeleteResult } from "../plantation.model";

/* eslint-disable no-unused-vars */
interface IPlantationsListProps {
  dataSet: IPlantation[];
  pagination: IPagination;
  sort: ISort;
  onChangeCurrentPage: (value: number) => void;
  onChangeCountPerPage: (value: number) => void;
  onChangeSort: (value: ISort) => void;
  onRefresh: () => void;
}
/* eslint-unable no-unused-vars */

const getTableHeader = (t: TFunction) => [
  {
    label: t("plantation.area"),
    value: "areaSize",
    minWidth: 150,
  },
  {
    label: t("plantation.name"),
    value: "name",
    minWidth: 150,
  },
  {
    label: t("plantation.region"),
    value: "region",
    width: 700,
  },
];

const PlantationList: React.FC<IPlantationsListProps> = ({
  dataSet,
  pagination,
  sort,
  onChangeCountPerPage,
  onChangeCurrentPage,
  onChangeSort,
  onRefresh,
}) => {
  const { t } = useTranslation("organization");
  const [id, setId] = useState<number | null>(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [deletePlantation] = useMutation<IDeleteResult, IDeleteParams>(
    DELETE_PLANTATION
  );

  const handleOnDelete = (value: IPlantation) => {
    setId(value.id);
    setConfirmDeleteModal(true);
  };

  const handleOnEdit = () => {};
  const handlerCloseModal = () => setConfirmDeleteModal(false);

  return (
    <>
      <Modal
        title={t("message:default:delete:title")}
        okText={t("actions:delete")}
        cancelText={t("actions:cancel")}
        visible={confirmDeleteModal}
        onOk={async () => {
          if (id) {
            const { data, errors } = await deletePlantation({
              variables: { deletePlantationId: id },
            });
            if (!data?.deletePlantation?.id && errors)
              message.error(t("message:default:error:title"));
            if (data?.deletePlantation?.id) {
              message.success(t("plantation.deleted"));
              onRefresh();
            }
            setConfirmDeleteModal(false);
          }
        }}
        onCancel={handlerCloseModal}
        okButtonProps={{
          danger: true,
        }}
      >
        {t("message:default:delete:description")}
      </Modal>

      <Table
        sort={sort}
        pagination={pagination}
        data={dataSet}
        headerLabels={getTableHeader(t)}
        onChangeCurrentPage={onChangeCurrentPage}
        onChangeCountPerPage={onChangeCountPerPage}
        onChangeSort={onChangeSort}
        showItem={({ item }) => (
          <>
            <td>{formatNumber(item.areaSize)}</td>
            <td>{item.name}</td>
            <td>{item.region}</td>
          </>
        )}
        actions={{
          showDelete: true,
          showEdit: true,
          onDelete: handleOnDelete,
          onEdit: handleOnEdit,
        }}
      />
    </>
  );
};

export default PlantationList;
