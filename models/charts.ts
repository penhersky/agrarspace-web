import { Selection } from "d3";

export type SVGElement = Selection<
  SVGSVGElement | null,
  unknown,
  null,
  undefined
>;

export interface IExtendFunctionality {
  // eslint-disable-next-line no-unused-vars
  extendFunctionality?: (svg: SVGElement) => void;
}

export interface IDataPie {
  color: string;
  value: number;
}
