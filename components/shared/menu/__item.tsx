import { Button, Typography } from "antd";
import React from "react";

import styles from "./menu.module.less";

export interface IMenuItemProps {
  children?: React.ReactElement;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Item: React.FC<IMenuItemProps> = ({ label, children, onClick }) => (
  <Button className={styles.item} onClick={onClick} type="text">
    {children || <Typography.Text>{label}</Typography.Text>}
  </Button>
);

export default Item;
