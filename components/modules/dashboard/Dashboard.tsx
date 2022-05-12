import clsx from "clsx";
import React from "react";

import { PieChart } from "../../charts";
import { WeatherWidget } from "../../organism";
import { ViewProvider } from "../../providers";
import styles from "./dashboard.module.less";

// eslint-disable-next-line arrow-body-style
const Dashboard = () => {
  return (
    <ViewProvider>
      <div className={clsx("scroll-area", styles.dashboard)}>
        <div className={styles.widgets}>
          <div className={clsx(styles.widget, styles.plantedWidget)}>
            <PieChart
              data={[
                { color: "green", value: 20 },
                { color: "lightgray", value: 80 },
              ]}
            />
          </div>
          <div className={clsx(styles.widget, styles.dayPeriodWidget)}>
            <PieChart
              data={[
                { color: "green", value: 20 },
                { color: "lightgray", value: 80 },
              ]}
            />
          </div>
          <div className={clsx(styles.widget, styles.weatherWidget)}>
            <WeatherWidget />
          </div>
        </div>
      </div>
    </ViewProvider>
  );
};

export default Dashboard;
