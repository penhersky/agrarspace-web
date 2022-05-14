import { arc as Arc, interpolate, pie as Pie, PieArcDatum, select } from "d3";
import React, { useLayoutEffect, useRef } from "react";

import { IDataPie, IExtendFunctionality } from "../../../models/charts.model";

interface IPieChartProps extends IExtendFunctionality {
  size?: number;
  weight?: number;
  radius?: number;
  data: IDataPie[];
  colors: string[];
}

const PieChart: React.FC<IPieChartProps> = ({
  size = 100,
  weight = 10,
  radius: strokeRadius = 3,
  data,
  colors,
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
      .attr("fill", (_, i) => colors[i])
      .transition()
      .duration((_, i) => i + 1 + 1000)
      .attrTween("d", (d) => {
        const i = interpolate(d.startAngle + 0.1, d.endAngle);
        return (t) => {
          d.endAngle = i(t);
          return arc(d) as string;
        };
      });
    extendFunctionality?.(svg);

    return () => {
      svg.selectChild().remove();
    };
  }, [data, size, weight, extendFunctionality, strokeRadius, colors]);

  return <svg ref={ref} width={size} height={size} />;
};

export default PieChart;
