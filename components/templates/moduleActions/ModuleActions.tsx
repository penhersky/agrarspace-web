import { Button, Input } from "antd";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React from "react";

import { AddIcon, FilterIcon, RefreshIcon } from "../../../utils/icons";
import styles from "./module-action.module.less";

interface IModuleActionsProps {
  mainActionText: string;
  onMainActionClick: () => void;
  // eslint-disable-next-line no-unused-vars
  onSearchSubmit: (text: string) => void;
  onPressFilter: () => void;
  onPressRefresh: () => void;
  filterActive: boolean;
}

const ModuleActions: React.FC<IModuleActionsProps> = ({
  mainActionText,
  onMainActionClick,
  onPressRefresh,
  onPressFilter,
  onSearchSubmit,
  filterActive,
}) => {
  const { t } = useTranslation("actions");

  return (
    <div className={styles.actinsGroup}>
      <Button
        icon={<RefreshIcon size={26} />}
        size="large"
        className={styles.toggle}
        onClick={onPressRefresh}
      />
      <Button
        icon={<FilterIcon size={26} />}
        size="large"
        className={clsx(styles.toggle, filterActive ? styles.toggled : "")}
        onClick={onPressFilter}
        type={filterActive ? "primary" : "default"}
      />
      <Input.Search
        size="large"
        placeholder={t("search")}
        name="plantation-search"
        className={styles.search}
        allowClear
        onSearch={onSearchSubmit}
      />
      <Button
        type="primary"
        size="large"
        icon={<AddIcon size={26} />}
        onClick={onMainActionClick}
        className={styles.mainAction}
      >
        {mainActionText}
      </Button>
    </div>
  );
};

export default ModuleActions;
