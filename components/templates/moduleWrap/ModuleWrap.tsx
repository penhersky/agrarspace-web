import { ApolloError } from "@apollo/client";
import { Typography } from "antd";
import React from "react";

import { Loading, Message } from "../../shared";
import styles from "./module-wrap.module.less";

interface IModuleWrap {
  title: string;
  hatNode?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  error?: ApolloError;
}

const ModuleWrap: React.FC<IModuleWrap> = ({
  title,
  children,
  hatNode,
  loading,
  error,
}) => (
  <div className={styles.modelWrap}>
    <div className={styles.hat}>
      <Typography.Title level={1} className={styles.title}>
        {title}
      </Typography.Title>

      {hatNode && hatNode}
    </div>
    <div className={styles.childrenWrap}>
      {error ? <Message type="error" size="medium" /> : children}
      {loading && (
        <div className={styles.loadingArea}>
          <Loading />
        </div>
      )}
    </div>
  </div>
);

export default ModuleWrap;
