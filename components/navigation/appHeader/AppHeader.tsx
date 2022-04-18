import { Typography } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";
import { useSelector } from "react-redux";

import { StateType } from "../../../store/store";
import { CatalogIcon, LineChartIcon } from "../../../utils/icons";
import { UserEmblem } from "../../shared";
import styles from "./app-header.module.less";

const AppHeader = () => {
  const { t } = useTranslation("navigation");
  const { user } = useSelector((state: StateType) => state.user);

  return (
    <div className={styles.header}>
      <div className={styles.side}>
        <Link href="/" passHref>
          <div className={clsx(styles.link, "link")}>
            <CatalogIcon />
            <Typography className={styles.text}>
              {t("cultureCatalog")}
            </Typography>
          </div>
        </Link>
        <Link href="/" passHref>
          <div className={clsx(styles.link, "link")}>
            <LineChartIcon />
            <Typography className={styles.text}>
              {t("globalStatistics")}
            </Typography>
          </div>
        </Link>
      </div>
      <div className={styles.side}>
        {user ? <UserEmblem user={user} /> : null}
      </div>
    </div>
  );
};

export default AppHeader;
