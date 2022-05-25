import { useQuery } from "@apollo/client";
import { Typography } from "antd";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React from "react";

import useNavigation from "../../../../hooks/organizationNavigator.hook";
import { GET_ORGANIZATION_GENERAL_INFO } from "../../../../services/schemas/organization.schema";
import { formatNumber } from "../../../../utils/valueFormate";
import { Loading, Message } from "../../../shared";
import styles from "./general-info.module.less";

interface IYearIncomeProps {
  className: string;
}

interface IQueryResult {
  getOrganizationGeneralInfo: {
    plantationsCount: number;
    totalAreaSize: number;
    countOfEmployees: number;
    countOfCultures: number;
  };
}

const GeneralInfo: React.FC<IYearIncomeProps> = ({ className }) => {
  const { t } = useTranslation("organization");
  const { decryptedId } = useNavigation();
  const { data, error, loading } = useQuery<IQueryResult>(
    GET_ORGANIZATION_GENERAL_INFO,
    {
      variables: {
        data: {
          id: decryptedId,
        },
      },
    }
  );

  if (loading) return <Loading className={className} />;
  if (error || !data) return <Message className={className} type="error" />;

  return (
    <div className={clsx(className, styles.generalInfo)}>
      <div className={styles.item}>
        <Typography.Title level={4} className={styles.title}>
          {formatNumber(data.getOrganizationGeneralInfo.plantationsCount)}
        </Typography.Title>
        <Typography.Title level={5} className={styles.description}>
          {t(`generalInfo.plantationsCount`)}
        </Typography.Title>
      </div>
      <div className={styles.item}>
        <Typography.Title level={4} className={styles.title}>
          {formatNumber(data.getOrganizationGeneralInfo.totalAreaSize)}
        </Typography.Title>
        <Typography.Title level={5} className={styles.description}>
          {t(`generalInfo.hectaresAvailable`)}
        </Typography.Title>
      </div>
      <div className={styles.item}>
        <Typography.Title level={4} className={styles.title}>
          {formatNumber(data.getOrganizationGeneralInfo.countOfEmployees)}
        </Typography.Title>
        <Typography.Title level={5} className={styles.description}>
          {t(`generalInfo.employeeCount`)}
        </Typography.Title>
      </div>
      <div className={styles.item}>
        <Typography.Title level={4} className={styles.title}>
          {data.getOrganizationGeneralInfo.countOfCultures}
        </Typography.Title>
        <Typography.Title level={5} className={styles.description}>
          {t(`generalInfo.usedCultures`)}
        </Typography.Title>
      </div>
    </div>
  );
};

export default GeneralInfo;
