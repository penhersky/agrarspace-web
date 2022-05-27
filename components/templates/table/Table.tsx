/* eslint-disable no-unused-vars */
import { Pagination, Radio, Typography } from "antd";
import clsx from "clsx";
import React, { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import { IPagination, ISort } from "../../../models/list.model";
import { SortArrowDownIcon, SortArrowUpIcon } from "../../../utils/icons";
import styles from "./table.module.less";

interface ITableParams<T> {
  data: T[];
  headerLabels: {
    label: string;
    value: string;
    minWidth?: number;
    width?: number;
  }[];
  pagination: IPagination;
  sort?: ISort;
  showItem: React.FC<{ item: T }>;
  onChangeCurrentPage: (value: number) => void;
  onChangeCountPerPage: (value: number) => void;
  onChangeSort: (value: ISort) => void;
  className?: string;
}

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
          {pagination.totalItemCount > 10 && (
            <Radio.Button value={10}>10</Radio.Button>
          )}
          {pagination.totalItemCount > 10 && (
            <Radio.Button value={20}>20</Radio.Button>
          )}
          {pagination.totalItemCount > 20 && (
            <Radio.Button value={40}>40</Radio.Button>
          )}
        </Radio.Group>
      </div>
    </div>
  );
};

export default Table;
