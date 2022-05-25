import { useQuery } from "@apollo/client";
import { Button, Typography } from "antd";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React, { useRef, useState } from "react";

import useNavigation from "../../../../hooks/organizationNavigator.hook";
import { IGetTotalOrganizationAnnualYearsIncome } from "../../../../models/statistics.model";
import { GET_TOTAL_ORGANIZATION_ANNUAL_YEAR_INCOME } from "../../../../services/schemas/organization.schema";
import { RefreshIcon } from "../../../../utils/icons";
import { YearIncomeIntervalHistogram } from "../../../charts";
import { Loading, Message } from "../../../shared";
import styles from "./year-income.module.less";

interface IYearIncomeProps {
  className: string;
}

const YearIncome: React.FC<IYearIncomeProps> = ({ className }) => {
  const { t } = useTranslation("statistics");
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(1210);
  const { decryptedId } = useNavigation();

  const { data, error, loading, refetch } =
    useQuery<IGetTotalOrganizationAnnualYearsIncome>(
      GET_TOTAL_ORGANIZATION_ANNUAL_YEAR_INCOME,
      { variables: { getTotalOrganizationAnnualYearsIncomeId: decryptedId } }
    );

  const onRefreshHandler = () => {
    refetch();
    setWidth((prev) => (ref.current ? ref.current.clientWidth : prev));
  };

  if (loading) return <Loading className={className} />;

  return (
    <>
      <Typography.Title level={3} className="section-title">
        {t("yearIncome.title")}
      </Typography.Title>
      <div className={clsx(className, styles.container)} ref={ref}>
        <div className={styles.bar}>
          <Button
            icon={<RefreshIcon size={24} className="icons" />}
            onClick={onRefreshHandler}
            type="link"
          />
        </div>
        {!error && data ? (
          <YearIncomeIntervalHistogram
            height={400}
            width={width - 50}
            maxValue={data.getTotalOrganizationAnnualYearsIncome.maxValue}
            avgPlanted={data.getTotalOrganizationAnnualYearsIncome.avgPlanted}
            avgCollected={
              data.getTotalOrganizationAnnualYearsIncome.avgCollected
            }
            data={data.getTotalOrganizationAnnualYearsIncome.data}
          />
        ) : (
          <Message type="error" size="medium" />
        )}
      </div>
    </>
  );
};

export default YearIncome;
