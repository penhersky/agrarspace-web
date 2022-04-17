import React from "react";

import { ViewProvider } from "../../providers";

// eslint-disable-next-line arrow-body-style
const Dashboard = () => {
  return (
    <ViewProvider>
      <div>Dashboard</div>
    </ViewProvider>
  );
};

export default Dashboard;
