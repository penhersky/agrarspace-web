import { Typography } from "antd";
import clsx from "clsx";
import React, { useMemo } from "react";

import { DoneIcon, IconType, InfoIcon, WarnIcon } from "../../../utils/icons";
import styles from "./message.module.less";

interface IMessageProps {
  size?: "small" | "medium" | "large";
  type?: "info" | "success" | "info" | "warn" | "error" | "none";
  title: string;
  description?: string;
  icon?: IconType;
  children?: React.ReactNode;
  className?: string;
}

const Message: React.FC<IMessageProps> = ({
  size = "small",
  type = "none",
  title,
  description,
  icon: Icon,
  children,
  className,
}) => {
  const DefaultIcons = useMemo(() => {
    switch (type) {
      case "success":
        return DoneIcon;
      case "warn":
        return WarnIcon;
      case "error":
        return WarnIcon;

      default:
        return InfoIcon;
    }
  }, [type]);

  const iconSize = useMemo(() => {
    switch (size) {
      case "large":
        return 100;
      case "medium":
        return 55;

      default:
        return 30;
    }
  }, [size]);

  return (
    <div className={clsx(styles.message, styles[type], className)}>
      {Icon ? (
        <Icon
          size={iconSize}
          className={clsx(styles.icon, styles[`icon-${type}`])}
        />
      ) : (
        <DefaultIcons
          size={iconSize}
          className={clsx(styles.icon, styles[`icon-${type}`])}
        />
      )}
      <Typography.Title
        level={4}
        className={clsx(styles.title, styles[`title-${size}`])}
      >
        {title}
      </Typography.Title>
      {description && (
        <Typography.Text
          className={clsx(styles.description, styles[`description-${size}`])}
        >
          {description}
        </Typography.Text>
      )}
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default Message;
