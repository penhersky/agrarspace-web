import { Typography } from "antd";
import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./sidebar.module.less";

interface IItem {
  children: string;
  Icon: React.FC<{ className: string; size: number }>;
  to: string;
}

const Item: React.FC<IItem> = ({ Icon, children, to }) => (
  <NavLink
    className={({ isActive }) =>
      clsx(styles.item, isActive && styles.activeItem)
    }
    to={to}
  >
    <div className={styles.activeMarker} />
    <div className={styles.itemContent}>
      <Icon className={styles.icon} size={24} />
      <Typography.Text>{children}</Typography.Text>
    </div>
  </NavLink>
);

export default Item;
