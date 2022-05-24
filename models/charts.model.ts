import { Selection } from "d3";

export type ISVGElement = Selection<
  SVGSVGElement | null,
  unknown,
  null,
  undefined
>;
export type ISVGRegularElement = Selection<
  SVGGElement,
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

export interface IXY {
  x: number;
  y: Number;
}

export interface Ix1x2y {
  x1: number;
  x2: number;
  y: Number;
}
