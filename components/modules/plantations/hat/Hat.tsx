import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import { Drop } from "../../../shared";
import { ModuleActions } from "../../../templates";
import styles from "./hat.module.less";

interface IPlantationHatPros {
  onRefresh: () => void;
  // eslint-disable-next-line no-unused-vars
  onSearch: (value: string) => void;
  loading: boolean;
}

const Hat: React.FC<IPlantationHatPros> = ({
  onRefresh,
  onSearch,
  loading,
}) => {
  const [dropped, setDropped] = useState(false);
  const { t } = useTranslation("organization");

  const handleOnAddPlantation = () => {};
  const handleOnFilterVisibility = () => setDropped((prev) => !prev);

  return (
    <div className={clsx(styles.hat, loading && "disabled")}>
      <ModuleActions
        mainActionText={t("plantation.addPlantation")}
        onMainActionClick={handleOnAddPlantation}
        onPressFilter={handleOnFilterVisibility}
        onPressRefresh={onRefresh}
        onSearchSubmit={onSearch}
        filterActive={dropped}
      />

      <Drop dropped={dropped}>
        <h1>Filters</h1>
      </Drop>
    </div>
  );
};

export default Hat;
