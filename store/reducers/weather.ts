import { TOrNull } from "../../models/global.model";
import { IRootWeather } from "../../models/weather.model";
import { setWeather } from "../actions";
import { SET_WEATHER } from "../types";

export type IActionType = ReturnType<typeof setWeather>;

export type StateType = {
  weather: TOrNull<IRootWeather>;
};

export const initialState: StateType = {
  weather: null,
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
    default:
      return state;
  }
};

export default user;
