import { useQuery } from "@apollo/client";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import { IRootData } from "../../../models/entity.model";
import { ISort } from "../../../models/list.model";
import { PLANTATIONS_LIST } from "../../../services/schemas/plantation.schema";
import { ViewProvider } from "../../providers";
import { ModuleWrap } from "../../templates";
import Hat from "./hat/Hat";
import PlantationsList from "./list/PlantationList";
import { IListQueryParams, IListQueryResult } from "./plantation.model";

const Plantations = () => {
  const { t } = useTranslation("organization");
  const [page, setPage] = useState(1);
  const [itemCountPerPage, setItemCountPerPage] = useState(20);
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
          <PlantationsList
            sort={sort}
            onRefresh={handleRefresh}
            pagination={{
              ...data.getOrganizationPlantationList.pagination,
              currentPage: page,
            }}
            dataSet={data.getOrganizationPlantationList.data}
            onChangeCurrentPage={handleOnChangePage}
            onChangeCountPerPage={handleOnChangeItemCountPerPage}
            onChangeSort={handleOnChangeSort}
          />
        )}
      </ModuleWrap>
    </ViewProvider>
  );
};

export default Plantations;
