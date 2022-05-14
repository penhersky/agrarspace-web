import { ILocation } from "../../models/entity.model";
import { TOrNull } from "../../models/global.model";
import { IRootWeather } from "../../models/weather.model";
import { setWeather, setWeatherCoordinates } from "../actions";
import { SET_WEATHER, SET_WEATHER_COORDINATES } from "../types";

export type IActionType =
  | ReturnType<typeof setWeather>
  | ReturnType<typeof setWeatherCoordinates>;

export type StateType = {
  weather: TOrNull<IRootWeather>;
  location: TOrNull<ILocation>;
};

export const initialState: StateType = {
  weather: null,
  location: null,
};

const user = (
  // eslint-disable-next-line default-param-last
  state: StateType = initialState,
  action: IActionType
): StateType => {
  switch (action.type) {
    case SET_WEATHER:
      return {
        ...state,
        weather: action.payload as IRootWeather,
      };
    case SET_WEATHER_COORDINATES:
      return {
        ...state,
        location: action.payload as ILocation,
      };
    default:
      return state;
  }
};

export default user;
