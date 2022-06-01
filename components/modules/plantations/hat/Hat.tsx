import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import { CREATE_PLANTATION } from "../../../../services/schemas/plantation.schema";
import { Drop } from "../../../shared";
import { ModuleActions } from "../../../templates";
import PlantationInput from "../plantationInput/PlantationInput";
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
  const [addOpen, setAddOpen] = useState(false);
  const { t } = useTranslation();

  const handleOnAddPlantation = () => setAddOpen(true);
  const handleOnFilterVisibility = () => setDropped((prev) => !prev);

  return (
    <div className={clsx(styles.hat, loading && "disabled")}>
      <ModuleActions
        mainActionText={t("organization:plantation.addPlantation")}
        onMainActionClick={handleOnAddPlantation}
        onPressFilter={handleOnFilterVisibility}
        onPressRefresh={onRefresh}
        onSearchSubmit={onSearch}
        filterActive={dropped}
      />

      <PlantationInput
        visible={addOpen}
        onRefresh={onRefresh}
        title={t("organization:plantation.createPlantation")}
        onHidden={() => setAddOpen(false)}
        schema={CREATE_PLANTATION}
      />

      <Drop dropped={dropped}>
        <h1>Filters</h1>
      </Drop>
    </div>
  );
};

export default Hat;
