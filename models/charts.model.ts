import { Selection } from "d3";

export type ISVGElement = Selection<
  SVGSVGElement | null,
  unknown,
  null,
  undefined
>;

export interface IExtendFunctionality {
  // eslint-disable-next-line no-unused-vars
  extendFunctionality?: (svg: ISVGElement) => void;
}

export interface IDataPie {
  value: number;
}
