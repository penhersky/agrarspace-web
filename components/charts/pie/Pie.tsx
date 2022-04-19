import { arc as Arc, pie as Pie, PieArcDatum, select } from "d3";
import React, { useLayoutEffect, useRef } from "react";

import { IDataPie, IExtendFunctionality } from "../../../models/charts";

interface IPieChartProps extends IExtendFunctionality {
  size?: number;
  weight?: number;
  radius?: number;
  data: IDataPie[];
}

const PieChart: React.FC<IPieChartProps> = ({
  size = 100,
  weight = 10,
  radius: strokeRadius = 3,
  data,
  extendFunctionality,
}) => {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const svg = select(ref.current);
    const radius = size / 2;

    const pie = Pie<IDataPie>()
      .value((d) => d.value)
      .sort((a, b) => a.value - b.value);

    const arc = Arc<PieArcDatum<IDataPie>>()
      .innerRadius(radius - weight)
      .cornerRadius(strokeRadius)
      .outerRadius(radius);

    const container = svg
      .append("g")
      .attr("transform", `translate(${radius}, ${radius})`);

    container
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color);

    extendFunctionality?.(svg);

    return () => {
      svg.selectChild().remove();
    };
  }, [data, size, weight, extendFunctionality, strokeRadius]);

  return <svg ref={ref} width={size} height={size} />;
};

export default PieChart;
