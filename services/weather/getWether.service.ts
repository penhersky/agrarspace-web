/* eslint-disable no-unused-vars */
import { Lang } from "../../models/enums.model";

// eslint-disable-next-line import/prefer-default-export
export const getWeatherService = async (
  path: "on-call-weather",
  lat: number,
  lng: number,
  lang?: Lang
) =>
  fetch(`/api/${path}?lat=${lat}&lng=${lng}&lang=${lang}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((value) => value.json());
