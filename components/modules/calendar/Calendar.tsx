import { Calendar } from "antd";
import React from "react";

import { ViewProvider } from "../../providers";

// eslint-disable-next-line arrow-body-style
const CalendarModule = () => {
  return (
    <ViewProvider>
      <div>
        <h2>Calendar</h2>
        <Calendar />
      </div>
    </ViewProvider>
  );
};

export default CalendarModule;
