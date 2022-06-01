import { useQuery } from "@apollo/client";
import { TFunction, useTranslation } from "next-i18next";
import React, { useState } from "react";

import { IPlantation, IRootData } from "../../../models/entity.model";
import {
  IFilterInterval,
  IPagination,
  IPaginationInput,
  ISearch,
  ISelectItem,
  ISort,
} from "../../../models/list.model";
import { PLANTATIONS_LIST } from "../../../services/schemas/plantation.schema";
import { formatNumber } from "../../../utils/valueFormate";
import { ViewProvider } from "../../providers";
import { ModuleWrap, Table } from "../../templates";
import Hat from "./hat/Hat";

interface IListQueryResult {
  getOrganizationPlantationList: {
    data: IPlantation[];
    pagination: IPagination;
    option: {
      statuses: ISelectItem[];
      areaSize: IFilterInterval;
    };
  };
}

interface IListQueryParams {
  filter?: {
    areaSize: IFilterInterval;
  };
  sort: ISort;
  pagination: IPaginationInput;
  search?: ISearch;
}

const getTableHeader = (t: TFunction) => [
  {
    label: t("plantation.area"),
    value: "areaSize",
    minWidth: 150,
  },
  {
    label: t("plantation.name"),
    value: "name",
  },
  {
    label: t("plantation.region"),
    value: "region",
    width: 700,
  },
];

const Plantations = () => {
  const { t } = useTranslation("organization");
  const [page, setPage] = useState(1);
  const [itemCountPerPage, setItemCountPerPage] = useState(10);
  const [sort, setSort] = useState<ISort>({
    field: "updatedAt",
    order: "DESC",
  });
  const [search, setSearch] = useState<string>("");

  const { data, loading, error, refetch } = useQuery<
    IListQueryResult,
    IRootData<IListQueryParams>
  >(PLANTATIONS_LIST, {
    fetchPolicy: "cache-first",
    variables: {
      data: {
        pagination: {
          page,
          itemCountPerPage,
        },
        sort,
        search: {
          value: search,
        },
      },
    },
  });

  const handleOnChangePage = (value: number) => setPage(value);
  const handleOnChangeItemCountPerPage = (value: number) => {
    setPage(1);
    setItemCountPerPage(value);
  };
  const handleOnChangeSort = (value: ISort) => setSort(value);
  const onSearchHandler = (value: string) => {
    setPage(1);
    setSearch(value);
  };
  const handleRefresh = () => refetch();

  return (
    <ViewProvider>
      <ModuleWrap
        error={error}
        title={t("navigation:plantations")}
        loading={loading}
        hatNode={
          <Hat
            onRefresh={handleRefresh}
            onSearch={onSearchHandler}
            loading={loading}
          />
        }
      >
        {data && (
          <Table
            sort={sort}
            pagination={{
              ...data.getOrganizationPlantationList.pagination,
              currentPage: page,
            }}
            data={data.getOrganizationPlantationList.data}
            headerLabels={getTableHeader(t)}
            onChangeCurrentPage={handleOnChangePage}
            onChangeCountPerPage={handleOnChangeItemCountPerPage}
            onChangeSort={handleOnChangeSort}
            showItem={({ item }) => (
              <>
                <td>{formatNumber(item.areaSize)}</td>
                <td>{item.name}</td>
                <td>{item.region}</td>
              </>
            )}
          />
        )}
      </ModuleWrap>
    </ViewProvider>
  );
};

export default Plantations;
