import clsx from "clsx";
import React from "react";

import { WeatherWidget } from "../../organism";
import { ViewProvider } from "../../providers";
import { Message } from "../../shared";
import styles from "./dashboard.module.less";
import PlantedAreaWidget from "./plantedArea/PlantedArea";

// eslint-disable-next-line arrow-body-style
const Dashboard = () => {
  return (
    <ViewProvider>
      <div className={clsx("scroll-area", styles.dashboard)}>
        <div className={styles.widgets}>
          <PlantedAreaWidget
            className={clsx(styles.widget, styles.plantedWidget)}
          />
          <div className={clsx(styles.widget, styles.dayPeriodWidget)}>
            <Message title="Time" size="medium" type="warn" />
          </div>
          <WeatherWidget
            className={clsx(styles.widget, styles.weatherWidget)}
          />
        </div>
      </div>
    </ViewProvider>
  );
};

export default Dashboard;
