import React from "react";

import { ViewProvider } from "../../providers";

// eslint-disable-next-line arrow-body-style
const Weather = () => {
  return (
    <ViewProvider>
      <div>Weather</div>
    </ViewProvider>
  );
};

export default Weather;
