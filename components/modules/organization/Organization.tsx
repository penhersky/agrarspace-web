import { Button, Typography } from "antd";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React from "react";

import { IOrganization } from "../../../models/entity.model";
import { ExclamationIcon } from "../../../utils/icons";
import { ViewProvider } from "../../providers";
import { Image } from "../../shared";
import GeneralInfo from "./generalInfo/GeneralInfo";
import styles from "./organization.module.less";
import YearIncome from "./yearIncome/YearIncome";

interface IOrganizationProps {
  organization: IOrganization;
}

const Organization: React.FC<IOrganizationProps> = ({ organization }) => {
  const { t } = useTranslation();

  return (
    <ViewProvider>
      <div className={styles.organization}>
        <div className={styles.hat}>
          <Image
            src={organization.logo}
            alt={organization.name}
            className={styles.logo}
          />
          <Typography.Title>{organization.name}</Typography.Title>
          <Typography.Text>{organization.description}</Typography.Text>
          {!organization.confirmed && (
            <Button
              className={styles.needConfirmation}
              icon={<ExclamationIcon size={16} />}
              danger
            >
              {t("message:needConfirmation")}
            </Button>
          )}
        </div>
        <GeneralInfo className={clsx("card", styles.generalInfo)} />
        <YearIncome className={clsx("card", styles.yearIncomeChart)} />
      </div>
    </ViewProvider>
  );
};

export default Organization;
