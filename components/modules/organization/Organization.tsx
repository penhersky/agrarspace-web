import { Typography } from "antd";
import clsx from "clsx";
import React from "react";

import { IOrganization } from "../../../models/entity.model";
import { ViewProvider } from "../../providers";
import styles from "./organization.module.less";
import YearIncome from "./yearIncome/YearIncome";

interface IOrganizationProps {
  organization: IOrganization;
}

// eslint-disable-next-line arrow-body-style
const Organization: React.FC<IOrganizationProps> = ({ organization }) => {
  return (
    <ViewProvider>
      <div className={styles.organization}>
        <div className={styles.hat}>
          <Typography.Title>{organization.name}</Typography.Title>
          <Typography.Text>{organization.description}</Typography.Text>
        </div>

        <YearIncome className={clsx("card", styles.yearIncomeChart)} />
      </div>
    </ViewProvider>
  );
};

export default Organization;
