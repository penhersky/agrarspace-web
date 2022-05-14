import clsx from "clsx";
import React from "react";

import { WeatherWidget } from "../../organism";
import { ViewProvider } from "../../providers";
import styles from "./dashboard.module.less";
import PlantedAreaWidget from "./plantedArea/PlantedArea";

// eslint-disable-next-line arrow-body-style
const Dashboard = () => {
  return (
    <ViewProvider>
      <div className={clsx("scroll-area", styles.dashboard)}>
        <div className={styles.widgets}>
          <div className={clsx(styles.widget, styles.plantedWidget)}>
            <PlantedAreaWidget />
          </div>
          <div className={clsx(styles.widget, styles.dayPeriodWidget)}>#</div>
          <div className={clsx(styles.widget, styles.weatherWidget)}>
            <WeatherWidget />
          </div>
        </div>
      </div>
    </ViewProvider>
  );
};

export default Dashboard;
