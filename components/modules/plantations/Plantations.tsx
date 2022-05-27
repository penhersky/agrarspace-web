import { useQuery } from "@apollo/client";
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

const tableHeader = [
  {
    label: "Area ha",
    value: "areaSize",
    minWidth: 150,
  },
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Region",
    value: "region",
    width: 700,
  },
];

const Plantations = () => {
  const [page, setPage] = useState(1);
  const [itemCountPerPage, setItemCountPerPage] = useState(10);
  const [sort, setSort] = useState<ISort>({
    field: "updatedAt",
    order: "DESC",
  });

  const { data, loading, error } = useQuery<
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
      },
    },
  });

  const handleOnChangePage = (value: number) => setPage(value);
  const handleOnChangeItemCountPerPage = (value: number) => {
    setPage(1);
    setItemCountPerPage(value);
  };
  const handleOnChangeSort = (value: ISort) => setSort(value);

  return (
    <ViewProvider>
      <ModuleWrap
        error={error}
        title="Plantations"
        loading={loading}
        hatNode={({ className }) => (
          <div className={className}>
            <h1>2</h1>
          </div>
        )}
      >
        {({ className }) => (
          <div className={className}>
            {data && (
              <Table
                sort={sort}
                pagination={{
                  ...data.getOrganizationPlantationList.pagination,
                  currentPage: page,
                }}
                data={data.getOrganizationPlantationList.data}
                headerLabels={tableHeader}
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
          </div>
        )}
      </ModuleWrap>
    </ViewProvider>
  );
};

export default Plantations;
