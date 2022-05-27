import { ApolloError } from "@apollo/client";
import { Typography } from "antd";
import clsx from "clsx";
import React from "react";

import { Loading, Message } from "../../shared";
import styles from "./module-wrap.module.less";

interface IModuleWrap {
  title: string;
  hatNode?: React.FC<{ className: string }>;
  children: React.FC<{ className: string }>;
  loading?: boolean;
  error?: ApolloError;
}

const ModuleWrap: React.FC<IModuleWrap> = ({
  title,
  children: Children,
  hatNode: HatNode,
  loading,
  error,
}) => (
  <div className={styles.modelWrap}>
    <div className={styles.hat}>
      <Typography.Title level={1} className={styles.title}>
        {title}
      </Typography.Title>

      {HatNode && (
        <HatNode className={clsx(styles.hatNode, loading && "disabled")} />
      )}
    </div>
    <div className={styles.childrenWrap}>
      {error ? (
        <Message type="error" size="medium" />
      ) : (
        <Children className={styles.children} />
      )}
      {loading && (
        <div className={styles.loadingArea}>
          <Loading />
        </div>
      )}
    </div>
  </div>
);

export default ModuleWrap;
