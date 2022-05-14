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
