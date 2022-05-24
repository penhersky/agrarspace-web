/* eslint-disable no-unused-vars */
import clsx from "clsx";
import * as D3 from "d3";

import { ISVGRegularElement } from "../../../../models/charts.model";
import styles from "./tooltip.module.less";

const TOOLTIP_PADDING = 10;
const TEXT_HEIGHT = 22;
const HEIGHT = 80;
const WIDTH = 100;

interface Label {
  text: string;
  className?: string;
  height?: number;
}

export default <T>(
  svg: ISVGRegularElement,
  trigger: D3.Selection<SVGGElement, T, SVGGElement, unknown>,
  xPosition: (d: T) => number,
  chartHeight: number,
  contentCreator: (d: T) => Label[],
  option?: {
    width?: number;
    height?: number;
    className?: string;
  }
) => {
  const TOOLTIP_WIDTH = option?.width ?? WIDTH;
  const TOOLTIP_HEIGHT = option?.height ?? HEIGHT;

  const tooltip = svg
    .append("g")
    .attr("width", TOOLTIP_WIDTH)
    .attr("height", TOOLTIP_HEIGHT)
    .style("opacity", 0);

  trigger.on("mousemove", (event, d) => {
    tooltip
      .append("rect")
      .attr("width", TOOLTIP_WIDTH)
      .attr("height", TOOLTIP_HEIGHT)
      .attr("class", clsx(styles.tooltip, option?.className));

    contentCreator(d).forEach((label, i) => {
      tooltip
        .append("text")
        .text(label.text)
        .attr("class", clsx(styles.text, label.className as string))
        .attr(
          "transform",
          `translate(${TOOLTIP_PADDING}, ${
            (i + 1) * (label.height ?? TEXT_HEIGHT)
          })`
        );
    });

    tooltip
      .transition()
      .duration(10)
      .attr("transform", () => {
        const y = (() => {
          if (event.offsetY >= chartHeight - TOOLTIP_HEIGHT / 2)
            return chartHeight - TOOLTIP_HEIGHT;
          if (event.offsetY <= 0 + TOOLTIP_HEIGHT / 2) return 0;
          return event.offsetY - TOOLTIP_HEIGHT / 2;
        })();
        return `translate(${xPosition(d)}, ${y})`;
      })
      .style("display", "inline-block");
  });
  trigger.on("mouseout", () => {
    tooltip.style("opacity", 0);
    tooltip.selectChildren().remove();
  });
  trigger.on("mouseover", () => {
    tooltip.style("opacity", 0.9);
  });
};
