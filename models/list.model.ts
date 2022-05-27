export interface IPagination {
  currentPage: number;
  itemCountPerPage: number;
  totalItemCount: number;
  totalPagesCount: number;
}

export interface ISelectItem {
  key: string | number;
  label: string;
}

export interface IFilterInterval {
  min: number;
  max: number;
}

// input
export interface ISort {
  field: string;
  order: "ASC" | "DESC";
}

export interface IPaginationInput {
  itemCountPerPage: number;
  page: number;
}

export interface ISearch {
  value: string;
}
