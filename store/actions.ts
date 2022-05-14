import { IEmployee, ILocation, IUser } from "../models/entity.model";
import { UserTypes } from "../models/enums.model";
import { IRootWeather } from "../models/weather.model";
import {
  CLEAR_USER_DATA,
  SET_EMPLOYEE,
  SET_USER,
  SET_USER_TYPE,
  SET_WEATHER,
  SET_WEATHER_COORDINATES,
} from "./types";

// user
export const setAuthUser = (user: IUser) => ({ type: SET_USER, payload: user });
export const setAuthEmployee = (employee: IEmployee) => ({
  type: SET_EMPLOYEE,
  payload: employee,
});
export const setAuthUserType = (type: UserTypes) => ({
  type: SET_USER_TYPE,
  payload: type,
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
  payload: null,
});

// weather
export const setWeather = (data: IRootWeather) => ({
  type: SET_WEATHER,
  payload: data,
});
export const setWeatherCoordinates = (data: ILocation) => ({
  type: SET_WEATHER_COORDINATES,
  payload: data,
});
