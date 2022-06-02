import { IPagination, ISort } from "../../../models/list.model";
import { IconType } from "../../../utils/icons";

/* eslint-disable no-unused-vars */
export type ActionFunction<T> = (data: T) => void;

export interface IAction<T> {
  showDelete?: boolean;
  showEdit?: boolean;
  onEdit?: ActionFunction<T>;
  onDelete?: ActionFunction<T>;
  edition?: {
    Icon: IconType;
    visible: boolean;
    onClick: ActionFunction<T>;
  }[];
}

export interface ITableParams<T> {
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
  actions?: IAction<T>;
}
