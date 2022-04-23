import { IEmployee, IUser } from "../../models/entity.model";
import { UserTypes } from "../../models/enums.model";
import { TOrNull } from "../../models/global.model";
import { setAuthEmployee, setAuthUser, setAuthUserType } from "../actions";
import {
  SET_EMPLOYEE,
  SET_SESSION_TOKEN,
  SET_USER,
  SET_USER_TYPE,
} from "../types";

export type IActionType =
  | ReturnType<typeof setAuthUser>
  | ReturnType<typeof setAuthEmployee>
  | ReturnType<typeof setAuthUserType>;

export type StateType = {
  user: TOrNull<IUser>;
  employee: TOrNull<IEmployee>;
  type: UserTypes;
  token: TOrNull<string>;
};

export const initialState: StateType = {
  user: null,
  employee: null,
  type: UserTypes.User,
  token: null,
};

const user = (
  // eslint-disable-next-line default-param-last
  state: StateType = initialState,
  action: IActionType
): StateType => {
  switch (action.type) {
    case SET_SESSION_TOKEN:
      return {
        ...state,
        token: action.payload as string,
      };
    case SET_USER_TYPE:
      return {
        ...state,
        type: action.payload as UserTypes,
      };
    case SET_EMPLOYEE:
      return {
        ...state,
        employee: action.payload as IEmployee,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload as IUser,
      };
    default:
      return state;
  }
};

export default user;
