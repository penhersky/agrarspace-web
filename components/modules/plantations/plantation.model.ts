import { IPlantation } from "../../../models/entity.model";
import {
  IFilterInterval,
  IPagination,
  IPaginationInput,
  ISearch,
  ISelectItem,
  ISort,
} from "../../../models/list.model";

export interface IListQueryResult {
  getOrganizationPlantationList: {
    data: IPlantation[];
    pagination: IPagination;
    option: {
      statuses: ISelectItem[];
      areaSize: IFilterInterval;
    };
  };
}

export interface IListQueryParams {
  filter?: {
    areaSize: IFilterInterval;
  };
  sort: ISort;
  pagination: IPaginationInput;
  search?: ISearch;
}
