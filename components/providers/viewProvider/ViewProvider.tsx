import React from "react";

import styles from "./view-provider.module.less";

interface IViewProviderProps {
  children: React.ReactNode;
}

const ViewProvider: React.FC<IViewProviderProps> = ({ children }) => (
  <div className="scroll-area">
    <div className={styles.container}>{children}</div>
  </div>
);

export default ViewProvider;
