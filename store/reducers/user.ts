import { IEmployee, IUser } from "../../models/entity.model";
import { UserTypes } from "../../models/enums.model";
import { TOrNull } from "../../models/global.model";
import { setAuthEmployee, setAuthUser, setAuthUserType } from "../actions";
import {
  CLEAR_USER_DATA,
  SET_EMPLOYEE,
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
};

export const initialState: StateType = {
  user: null,
  employee: null,
  type: UserTypes.User,
};

const user = (
  // eslint-disable-next-line default-param-last
  state: StateType = initialState,
  action: IActionType
): StateType => {
  switch (action.type) {
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
    case CLEAR_USER_DATA:
      return {
        ...state,
        user: null,
        employee: null,
        type: UserTypes.User,
      };
    default:
      return state;
  }
};

export default user;
