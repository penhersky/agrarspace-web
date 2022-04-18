import { IUser } from "../../models/entity";
import { setAuthUser } from "../actions";
import { SET_USER } from "../types";

export type IActionType = ReturnType<typeof setAuthUser>;

export type StateType = {
  user?: IUser;
};

export const initialState: StateType = {
  user: undefined,
};

const user = (
  // eslint-disable-next-line default-param-last
  state: StateType = initialState,
  action: IActionType
): StateType => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default user;
