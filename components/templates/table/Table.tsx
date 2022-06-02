import { Button, Pagination, Radio, Typography } from "antd";
import clsx from "clsx";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import {
  DeleteIcon,
  EditIcons,
  SortArrowDownIcon,
  SortArrowUpIcon,
} from "../../../utils/icons";
import { ITableParams } from "./table.model";
import styles from "./table.module.less";

const Table = <T extends { id: number }>({
  data,
  headerLabels,
  showItem: Item,
  pagination,
  sort,
  onChangeCountPerPage,
  onChangeCurrentPage,
  onChangeSort,
  className,
  actions,
}: ITableParams<T>) => {
  const getArrow = (order: string) => {
    switch (order) {
      case "ASC":
        return <SortArrowDownIcon size={22} />;
      case "DESC":
        return <SortArrowUpIcon size={22} />;

      default:
        return <SortArrowUpIcon size={22} />;
    }
  };

  return (
    <div className={clsx(styles.table, className)}>
      <table>
        <thead>
          <tr>
            {headerLabels.map((value) => (
              <th
                key={uuidv4()}
                style={{ minWidth: value.minWidth, width: value.width }}
                onClick={() =>
                  onChangeSort({
                    field: value.value,
                    order: sort?.order === "ASC" ? "DESC" : "ASC",
                  })
                }
              >
                <div className={styles.heaterItemContent}>
                  <Typography.Text>{value.label}</Typography.Text>
                  <div
                    className={clsx(
                      styles.sort,
                      value.value === sort?.field && styles.sortVisible
                    )}
                  >
                    {value.value === sort?.field
                      ? getArrow(sort.order)
                      : getArrow("DESC")}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((value) => (
            <tr key={uuidv4()}>
              <Item item={value} />
              <div
                className={styles.itemActions}
                style={{
                  display:
                    actions?.showEdit || actions?.showDelete
                      ? "initial"
                      : "none",
                }}
              >
                {actions?.edition &&
                  actions.edition.map((action) => (
                    <Button
                      className={styles.action}
                      style={{ display: action.visible ? "initial" : "none" }}
                      onClick={() => action.onClick(value)}
                      type="text"
                    >
                      <action.Icon size={24} />
                    </Button>
                  ))}
                <Button
                  className={clsx(styles.action, styles.edit)}
                  style={{ display: actions?.showEdit ? "initial" : "none" }}
                  onClick={() => actions?.onEdit?.(value)}
                  type="text"
                >
                  <EditIcons size={24} />
                </Button>

                <Button
                  className={clsx(styles.action, styles.delete)}
                  style={{ display: actions?.showDelete ? "initial" : "none" }}
                  onClick={() => actions?.onDelete?.(value)}
                  type="text"
                >
                  <DeleteIcon size={24} />
                </Button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.footer}>
        <Typography.Text>{pagination.totalItemCount}</Typography.Text>
        <Pagination
          current={pagination.currentPage}
          disabled={pagination.itemCountPerPage > pagination.totalItemCount}
          total={pagination.totalItemCount}
          className={styles.pagination}
          showSizeChanger={false}
          style={{
            visibility: pagination.totalPagesCount <= 1 ? "hidden" : "visible",
          }}
          onChange={onChangeCurrentPage}
          size="small"
        />

        <Radio.Group
          defaultValue={10}
          value={pagination.itemCountPerPage}
          className={styles.radio}
          onChange={(e) => onChangeCountPerPage(e.target.value)}
        >
          {pagination.totalItemCount > 20 && (
            <Radio.Button value={20}>20</Radio.Button>
          )}
          {pagination.totalItemCount > 20 && (
            <Radio.Button value={40}>40</Radio.Button>
          )}
          {pagination.totalItemCount > 40 && (
            <Radio.Button value={60}>60</Radio.Button>
          )}
        </Radio.Group>
      </div>
    </div>
  );
};

export default Table;
