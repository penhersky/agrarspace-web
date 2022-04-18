import { IUser } from "../models/entity";
import { SET_USER } from "./types";

// eslint-disable-next-line import/prefer-default-export
export const setAuthUser = (user: IUser) => ({ type: SET_USER, payload: user });
