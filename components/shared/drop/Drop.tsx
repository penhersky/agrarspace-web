import clsx from "clsx";
import React from "react";

import styles from "./drop.module.less";

interface IDropProps {
  children: React.ReactNode | React.ReactNode[];
  dropped: boolean;
}

const Drop: React.FC<IDropProps> = ({ children, dropped }) => (
  <div className={clsx(styles.drop, dropped ? styles.dropped : styles.closed)}>
    <div className={styles.content}>{children}</div>
  </div>
);

export default Drop;
