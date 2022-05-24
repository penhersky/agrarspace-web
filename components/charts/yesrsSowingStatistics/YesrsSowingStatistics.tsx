import { Typography } from "antd";
import clsx from "clsx";
import * as D3 from "d3";
import { useTranslation } from "next-i18next";
import React, { useLayoutEffect, useMemo, useRef } from "react";

import { ITotalAnnualYearsIncomeContent } from "../../../models/statistics.model";
import { formatNumber } from "../../../utils/valueFormate";
import createTooltip from "../__helpers/tooltip/createTooltip";
import styles from "./chart.module.less";

interface IHistogramWithIntervalProps extends ITotalAnnualYearsIncomeContent {
  below?: number;
  height: number;
  width: number;
}

const MARGIN = {
  top: 20,
  left: 50,
  right: 0,
  bottom: 30,
};

const PERIOD_HEIGHT = 3;
const ANIMATION_TIME = 1000;
const ANIMATION_DELAY = 50;

const HistogramWithInterval: React.FC<IHistogramWithIntervalProps> = ({
  data,
  below = 0,
  height,
  width,
  avgCollected,
  avgPlanted,
  maxValue,
}) => {
  const { t } = useTranslation("statistics");
  const ref = useRef<SVGSVGElement>(null);

  const cHeight = height - MARGIN.top - MARGIN.bottom;
  const cWidth = width - MARGIN.left - MARGIN.right;

  const xScale = useMemo(
    () =>
      D3.scaleBand()
        .domain(data.map((d) => d.year.toString()))
        .range([0, cWidth])
        .padding(0.2),
    [data, cWidth]
  );

  const yScale = useMemo(
    () =>
      D3.scaleLinear()
        .domain([below, maxValue + (maxValue / 100) * 1])
        .range([cHeight, 0]),
    [cHeight, maxValue, below]
  );

  useLayoutEffect(() => {
    const svg = D3.select(ref.current)
      .append("g")
      .attr("width", cWidth)
      .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`);

    svg
      .append("g")
      .attr("class", "axis")
      .call(
        D3.axisLeft(yScale)
          .tickSize(0)
          .tickPadding(10)
          .ticks(2)
          .tickValues([0, avgPlanted, avgCollected, maxValue])
          .tickFormat((d) => formatNumber(d as number))
      );
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0, ${cHeight})`)
      .call(
        D3.axisBottom(xScale)
          .tickFormat((d) => d.toString())
          .tickPadding(10)
          .tickSize(0)
          .ticks(data.length + 2)
      );
    svg
      .append("line")
      .attr("class", "axis")
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("x1", 0)
      .attr("x2", cWidth);
    svg
      .append("line")
      .attr("class", "axis")
      .attr("y1", 0)
      .attr("y2", cHeight)
      .attr("x1", cWidth)
      .attr("x2", cWidth);

    // labels
    svg
      .append("text")
      .text(t("units.year"))
      .attr("class", styles.label)
      .attr("x", cWidth - 20)
      .attr("y", cHeight + 17);
    svg
      .append("text")
      .text(t("units.tons"))
      .attr("x", -35)
      .attr("y", -10)
      .attr("class", styles.label);

    // avg line
    svg
      .append("line")
      .attr("class", styles.plantedAvgLine)
      .attr("y1", yScale(avgPlanted))
      .attr("y2", yScale(avgPlanted))
      .attr("x1", 0)
      .attr("x2", cWidth);
    svg
      .append("line")
      .attr("class", styles.collectedAvgLine)
      .attr("y1", yScale(avgCollected))
      .attr("y2", yScale(avgCollected))
      .attr("x1", 0)
      .attr("x2", cWidth);

    // blocs
    const blockWidth = xScale.bandwidth();

    const container = svg.selectAll(".blocks").data(data).enter().append("g");

    const block = container
      .append("g")
      .attr("transform", (d) => `translate(${xScale(d.year.toString())}, 0)`);

    block
      .append("rect")
      .attr("width", blockWidth)
      .transition()
      .duration(ANIMATION_TIME)
      .attr("height", cHeight)
      .attr("class", styles.block)
      .delay((d, i) => i * ANIMATION_DELAY);

    // interval
    block
      .append("rect")
      .attr("y", (d) =>
        d.sumCollected ? yScale(d.sumCollected) : yScale(d.sumPlanted)
      )
      .attr("width", blockWidth)
      .transition()
      .duration(ANIMATION_TIME)
      .attr("height", (d) =>
        d.sumCollected
          ? cHeight - yScale(d.sumCollected - d.sumPlanted)
          : PERIOD_HEIGHT
      )
      .attr("class", styles.interval)
      .delay((d, i) => i * ANIMATION_DELAY);

    // collected
    block
      .append("rect")
      .attr("y", (d) => (d.sumCollected ? yScale(d.sumCollected) : 0))
      .transition()
      .duration(ANIMATION_TIME)
      .attr("width", blockWidth)
      .attr("height", PERIOD_HEIGHT)
      .attr("class", (d) =>
        d.sumCollected ? styles.collectedPeriod : "transparent"
      )
      .delay((_, i) => i * ANIMATION_DELAY);

    block
      .append("text")
      .text((d) =>
        d.sumCollected
          ? ` ${d.sumCollected > d.sumPlanted ? "+" : "-"}${formatNumber(
              d.sumCollected - d.sumPlanted
            )}`
          : ""
      )
      .attr("class", "chart-text")
      .attr("x", blockWidth / 2)
      .attr("width", blockWidth)
      .style("opacity", 0)
      .transition()
      .duration(ANIMATION_TIME)
      .attr(
        "y",
        (d) =>
          yScale(
            d.sumPlanted + (Number(d.sumCollected ?? 0) - d.sumPlanted) / 2
          ) + PERIOD_HEIGHT
      )
      .style("opacity", 1)
      .style("font-size", 16)
      .style("text-anchor", "middle")
      .delay((d, i) => i * ANIMATION_DELAY);

    // planted
    block
      .append("rect")
      .attr("y", (d) => yScale(d.sumPlanted))
      .transition()
      .duration(ANIMATION_TIME)
      .attr("width", blockWidth)
      .attr("height", PERIOD_HEIGHT)
      .attr("class", styles.plantedPeriod)
      .delay((_, i) => i * ANIMATION_DELAY);

    const TOOLTIP_WIDTH = 50 + maxValue.toString().length * 20;

    createTooltip(
      svg,
      block,
      (d) =>
        Number(xScale(d.year.toString())) +
        (d.year === data[data.length - 1].year
          ? -TOOLTIP_WIDTH
          : xScale.bandwidth()),
      cHeight,
      (d) => [
        ...(d.sumCollected
          ? [
              {
                text: `${t("yearIncome.collected")}: ${formatNumber(
                  d.sumCollected
                )}`,
              },
            ]
          : []),
        {
          text: d.sumCollected
            ? `${t("yearIncome.difference")}: ${formatNumber(
                d.sumCollected - d.sumPlanted
              )}`
            : "",
        },
        {
          text: `${t("yearIncome.planted")}: ${formatNumber(d.sumPlanted)}`,
        },
      ],
      {
        width: TOOLTIP_WIDTH,
      }
    );

    return () => {
      svg.selectChildren().remove();
    };
  }, [
    ref,
    avgCollected,
    avgPlanted,
    data,
    cHeight,
    cWidth,
    xScale,
    yScale,
    maxValue,
    t,
  ]);

  return (
    <div>
      <svg ref={ref} width="100%" height={height} />
      <div className={styles.legend}>
        <div className={styles.legend__item}>
          <div className={clsx(styles.mark, styles.legend__plantedPeriod)} />
          <Typography.Text>{t("yearIncome.planted")}</Typography.Text>
        </div>
        <div className={styles.legend__item}>
          <div className={clsx(styles.mark, styles.legend__plantedCollected)} />
          <Typography.Text>{t("yearIncome.collected")}</Typography.Text>
        </div>
        <div className={styles.legend__item}>
          <div className={clsx(styles.mark, styles.legend__plantedInterval)} />
          <Typography.Text>{t("yearIncome.difference")}</Typography.Text>
        </div>
        <div className={styles.legend__item}>
          <div className={styles.legend__plantedMedian} />
          <Typography.Text>{t("yearIncome.plantedMedian")}</Typography.Text>
        </div>
        <div className={styles.legend__item}>
          <div className={styles.legend__collectedMedian} />
          <Typography.Text>{t("yearIncome.collectedMedian")}</Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default HistogramWithInterval;
