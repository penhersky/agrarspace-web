import { TOrNull } from "./global.model";

interface PercentSection {
  value: number;
  name: string;
  percent: number;
}

export interface IPercentStatistic {
  data: PercentSection[];
  totalPercent: number;
  totalValue: number;
}

export interface IGetOrganizationPlantedAreaPerYear {
  getOrganizationPlantedAreaPerYear: IPercentStatistic;
}

export interface IDataAnnualYearsIncome {
  sumPlanted: number;
  sumCollected: TOrNull<number>;
  year: number;
}
export interface ITotalAnnualYearsIncomeContent {
  avgCollected: number;
  avgPlanted: number;
  maxValue: number;
  data: IDataAnnualYearsIncome[];
}

export interface IGetTotalOrganizationAnnualYearsIncome {
  getTotalOrganizationAnnualYearsIncome: ITotalAnnualYearsIncomeContent;
}
