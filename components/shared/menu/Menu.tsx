import React from "react";

import Item, { IMenuItemProps } from "./__item";
import styles from "./menu.module.less";

interface IMenuProps {
  children: React.ReactElement | React.ReactElement[];
}

const Menu: React.FC<IMenuProps> & {
  Item: React.FC<IMenuItemProps>;
} = ({ children }) => <div className={styles.menu}>{children}</div>;

Menu.Item = Item;

export default Menu;
