export const icons = {
  // Thunderstorm
  200: { value: "lightrainandthunder", dayNight: false },
  201: { value: "lightrainandthunder", dayNight: false },
  202: { value: "heavyrainandthunder", dayNight: false },
  210: { value: "lightrainshowersandthunder", dayNight: true },
  211: { value: "lightrainshowersandthunder", dayNight: true },
  212: { value: "heavyrainandthunder", dayNight: false },
  221: { value: "heavyrainandthunder", dayNight: false },
  230: { value: "heavyrainandthunder", dayNight: false },
  231: { value: "heavyrainandthunder", dayNight: false },
  232: { value: "heavyrainandthunder", dayNight: false },

  // Drizzle
  300: { value: "lightrain", dayNight: false },
  301: { value: "heavyrain", dayNight: false },
  302: { value: "heavyrain", dayNight: false },
  310: { value: "lightrain", dayNight: false },
  311: { value: "heavyrain", dayNight: false },
  312: { value: "heavyrain", dayNight: false },
  313: { value: "heavyrain", dayNight: false },
  314: { value: "heavyrain", dayNight: false },

  // rain
  500: { value: "lightrainshowers", dayNight: true },
  501: { value: "lightrainshowers", dayNight: true },
  502: { value: "lightrainshowers", dayNight: true },
  503: { value: "lightrainshowers", dayNight: true },
  504: { value: "lightrainshowers", dayNight: true },
  511: { value: "lightrainshowers", dayNight: true },
  520: { value: "heavyrainshowers", dayNight: true },
  521: { value: "heavyrainshowers", dayNight: true },
  522: { value: "heavyrainshowers", dayNight: true },
  531: { value: "heavyrainshowers", dayNight: true },

  // snow
  600: { value: "lightsnow", dayNight: false },
  601: { value: "lightsnow", dayNight: false },
  602: { value: "heavysnowshowers", dayNight: true },
  611: { value: "lightsleet", dayNight: false },
  612: { value: "lightsleetshowers", dayNight: true },
  613: { value: "heavysleetshowers", dayNight: true },
  615: { value: "lightsleet", dayNight: false },
  616: { value: "heavysleet", dayNight: false },
  620: { value: "lightsnowshowers", dayNight: true },
  621: { value: "heavysnowshowers", dayNight: true },
  622: { value: "heavysnowshowers", dayNight: true },

  // Atmosphere
  701: { value: "fog", dayNight: false },
  711: { value: "fog", dayNight: false },
  721: { value: "fog", dayNight: false },
  731: { value: "fog", dayNight: false },
  741: { value: "fog", dayNight: false },
  751: { value: "fog", dayNight: false },
  761: { value: "fog", dayNight: false },
  762: { value: "fog", dayNight: false },
  771: { value: "fog", dayNight: false },
  781: { value: "fog", dayNight: false },

  // clear
  800: { value: "clearsky", dayNight: true },

  // clouds
  801: { value: "fair", dayNight: true },
  802: { value: "partlycloudy", dayNight: true },
  803: { value: "partlycloudy", dayNight: true },
  804: { value: "cloudy", dayNight: false },
};

export type WeatherIds = keyof typeof icons;
interface IGetWeatherIconParams {
  id: WeatherIds;
  sunrise: number;
  current: number;
  sunset: number;
}

export const getWeatherIconPathByName = (name: string) =>
  `${process.env.WEATHER_ICON_URL}/${name}.svg`;

export const getWeatherIconPathById = ({
  sunrise,
  sunset,
  current,
  id,
}: IGetWeatherIconParams) => {
  const type = sunrise < current && sunset > current ? "day" : "night";

  const imageName = `${icons[id].value}${icons[id].dayNight ? `_${type}` : ""}`;
  return `${process.env.WEATHER_ICON_URL}/${imageName}.svg`;
};
