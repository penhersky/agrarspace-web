import { useQuery } from "@apollo/client";
import { Button, Typography } from "antd";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";

import {
  PIE_CHART_SIZE_MEDIUM,
  PIE_CHART_WEIGHT_MEDIUM,
  PLANTED_AREA_PERCENT,
} from "../../../../constants/charts";
import { HECTARE } from "../../../../constants/units";
import { ISVGElement } from "../../../../models/charts.model";
import { IGetOrganizationPlantedAreaPerYear } from "../../../../models/statistics.model";
import { ORGANIZATION_PLANTED_AREA } from "../../../../services/schemas/statistics.schema";
import { formatNumber } from "../../../../utils/valueFormate";
import { PieChart } from "../../../charts";
import { Loading } from "../../../shared";
import styles from "./planted-area.module.less";

interface IPlantedAreaProps {
  className?: string;
}

const PlantedArea: React.FC<IPlantedAreaProps> = ({ className }) => {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery<IGetOrganizationPlantedAreaPerYear>(
    ORGANIZATION_PLANTED_AREA,
    {
      variables: {
        year: new Date().getUTCFullYear(),
      },
    }
  );

  const dataSet = useMemo(
    () =>
      data?.getOrganizationPlantedAreaPerYear.data.map((value) => ({
        value: value.value,
      })),

    [data]
  );

  const valueHa = useMemo(
    () =>
      data?.getOrganizationPlantedAreaPerYear.data
        .map((value) => formatNumber(value.value))
        .join(" / "),
    [data?.getOrganizationPlantedAreaPerYear]
  );

  const extendPie = (svg: ISVGElement) => {
    svg
      .append("text")
      .text(
        `${
          data?.getOrganizationPlantedAreaPerYear.data.find(
            (value) => value.name === "planted"
          )?.percent
        }%`
      )
      .attr("class", clsx("chart-text", styles.pieText))
      .attr("width", PIE_CHART_SIZE_MEDIUM)
      .style("text-anchor", "middle")
      .style("dominant-baseline", "middle")
      .attr(
        "transform",
        `translate(${PIE_CHART_SIZE_MEDIUM / 2}, ${PIE_CHART_SIZE_MEDIUM / 2})`
      );
  };

  if (error) return <Typography>Error</Typography>;
  if (loading) return <Loading className={className} />;

  return (
    <div className={clsx(className, styles.container)}>
      <Button className={styles.details} type="link">
        {t("actions:details")}
      </Button>
      <PieChart
        size={PIE_CHART_SIZE_MEDIUM}
        weight={PIE_CHART_WEIGHT_MEDIUM}
        radius={1}
        data={dataSet ?? []}
        extendFunctionality={extendPie}
        colors={PLANTED_AREA_PERCENT}
      />
      <Typography.Text className={styles.value}>
        {valueHa}
        &nbsp;
        {HECTARE}
      </Typography.Text>
      <Typography.Title level={5} className={styles.label}>
        {t("dashboard:plantedTerritories")}
      </Typography.Title>
    </div>
  );
};

export default PlantedArea;
