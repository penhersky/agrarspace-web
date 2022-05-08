import { Avatar, Dropdown, Typography } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { UserTypes } from "../../../models/enums.model";
import { StateType } from "../../../store/store";
import { CatalogIcon, LineChartIcon } from "../../../utils/icons";
import styles from "./app-header.module.less";
import UserMenu from "./userMenu";

const AppHeader = () => {
  const { t } = useTranslation("navigation");
  const { user, employee, type } = useSelector(
    (state: StateType) => state.user
  );

  const name = useMemo(() => {
    if (type === UserTypes.Employee && employee) return employee.name;
    return `${user?.firstName} ${user?.lastName}`;
  }, [user, employee, type]);

  return (
    <div className={styles.header}>
      <div className={styles.side}>
        <Link href="/" passHref>
          <div className={clsx(styles.link, "link")}>
            <CatalogIcon />
            <Typography.Text className={styles.text}>
              {t("cultureCatalog")}
            </Typography.Text>
          </div>
        </Link>
        <Link href="/" passHref>
          <div className={clsx(styles.link, "link")}>
            <LineChartIcon />
            <Typography.Text className={styles.text}>
              {t("globalStatistics")}
            </Typography.Text>
          </div>
        </Link>
      </div>
      <div className={styles.side}>
        {user || employee ? (
          <Dropdown
            overlay={
              <UserMenu
                type={type}
                name={
                  employee
                    ? employee.name
                    : `${user?.firstName} ${user?.lastName}`
                }
              />
            }
            arrow={{ pointAtCenter: true }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <div className={styles.emblem}>
              <Avatar size={27}>{name.substring(0, 1)}</Avatar>
              <Typography.Title level={5} className={styles.name}>
                {name}
              </Typography.Title>
            </div>
          </Dropdown>
        ) : null}
      </div>
    </div>
  );
};

export default AppHeader;
