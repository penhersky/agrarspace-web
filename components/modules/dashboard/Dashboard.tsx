import React from "react";

import { PieChart } from "../../charts";
import { ViewProvider } from "../../providers";

// eslint-disable-next-line arrow-body-style
const Dashboard = () => {
  return (
    <ViewProvider>
      <div>Dashboard</div>

      <PieChart
        data={[
          { color: "green", value: 20 },
          { color: "lightgray", value: 80 },
        ]}
      />
    </ViewProvider>
  );
};

export default Dashboard;
