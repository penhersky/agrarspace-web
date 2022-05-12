/* eslint-disable no-unused-vars */
import { Lang } from "../../models/enums.model";

// eslint-disable-next-line import/prefer-default-export
export const getWeatherService = async (
  lat: number,
  lng: number,
  lang?: Lang
) =>
  fetch(
    `${process.env.WEATHER_API_URL}/onecall?lat=${lat}&lon=${lng}&appid=${
      process.env.WEATHER_API_KEY
    }&cnt=3&exclude=minutely&units=metric&lang=${lang ?? "en"}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((value) => value.json());
