import { Button, Divider } from "antd";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import { OZ_PAGES } from "../../../constants/navigation";
import useOrganizationNavigator from "../../../hooks/organizationNavigator.hook";
import {
  ArrowLeft,
  ArrowRight,
  // CalendarIcon,
  ContactUsIcon,
  DashboardIcon,
  EmployeesIcon,
  HelpIcon,
  // MapIcon,
  OrganizationIcon,
  PlantationIcon,
  PlantIcon,
  // WeatherIcon,
} from "../../../utils/icons";
import { Image } from "../../shared";
import Item from "./Item";
import styles from "./sidebar.module.less";

interface ISidebarProps {
  organization: {
    name: string;
    logo: string;
  };
}

const Sidebar: React.FC<ISidebarProps> = ({ organization: { logo, name } }) => {
  const { t } = useTranslation("navigation");
  const { createPath } = useOrganizationNavigator();
  const [fullView, setFullView] = useState(true);

  const handleOnViewChanged = () => setFullView((prev) => !prev);

  return (
    <div
      className={clsx(
        styles.sidebar,
        fullView ? styles.fullView : styles.minimizeView
      )}
    >
      <div className={styles.content}>
        <div className={styles.logo}>
          <Image src={logo} alt={name} />
        </div>
        <div className={styles.menu}>
          <Item
            to={createPath(OZ_PAGES.dashboard)}
            Icon={({ className, size }) => (
              <DashboardIcon className={className} size={size} />
            )}
          >
            {t("dashboard")}
          </Item>
          <Item
            Icon={({ className, size }) => (
              <OrganizationIcon className={className} size={size} />
            )}
            to={createPath(OZ_PAGES.organization)}
          >
            {t("organization")}
          </Item>
          <Divider className={styles.divider} />
          <Item
            Icon={({ className, size }) => (
              <PlantIcon className={className} size={size} />
            )}
            to={createPath(OZ_PAGES.yields)}
          >
            {t("years")}
          </Item>
          <Item
            Icon={({ className, size }) => (
              <PlantationIcon className={className} size={size} />
            )}
            to={createPath(OZ_PAGES.plantations)}
          >
            {t("plantations")}
          </Item>

          {/* <Item TODO: add in v1.1
            Icon={({ className, size }) => (
              <MapIcon className={className} size={size} />
            )}
            to={createPath(OZ_PAGES.globalMap)}
          >
            {t("globalMap")}
          </Item> */}
          <Divider className={styles.divider} />
          <Item
            Icon={({ className, size }) => (
              <EmployeesIcon className={className} size={size} />
            )}
            to={createPath(OZ_PAGES.employees)}
          >
            {t("employee")}
          </Item>
          {/* <Divider className={styles.divider} /> TODO: add in v1.2
          <Item
            Icon={({ className, size }) => (
              <CalendarIcon className={className} size={size} />
            )}
            to={createPath(OZ_PAGES.calendar)}
          >
            {t("calendar")}
          </Item>
          <Item
            Icon={({ className, size }) => (
              <WeatherIcon className={className} size={size} />
            )}
            to={createPath(OZ_PAGES.weather)}
          >
            {t("weather")}
          </Item> */}
          <Divider className={styles.divider} />
          <Item
            Icon={({ className, size }) => (
              <ContactUsIcon className={className} size={size} />
            )}
            to={createPath(OZ_PAGES.contactUs)}
          >
            {t("contactUs")}
          </Item>
          <Item
            Icon={({ className, size }) => (
              <HelpIcon className={className} size={size} />
            )}
            to={createPath(OZ_PAGES.help)}
          >
            {t("help")}
          </Item>
        </div>
      </div>
      <div className={styles.bottom}>
        <Divider className={styles.divider} />
        <Button
          type="text"
          shape="circle"
          onClick={handleOnViewChanged}
          icon={fullView ? <ArrowLeft size={26} /> : <ArrowRight size={26} />}
          className={styles.viewType}
        />
      </div>
    </div>
  );
};

export default Sidebar;
