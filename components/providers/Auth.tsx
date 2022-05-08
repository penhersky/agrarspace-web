import { useQuery } from "@apollo/client";
import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";

import { IAuthenticationResult } from "../../models/auth.model";
import { UserTypes } from "../../models/enums.model";
import { AUTHENTICATION } from "../../services/schemas/auth.schema";
import {
  setAuthEmployee,
  setAuthUser,
  setAuthUserType,
} from "../../store/actions";

interface IAuthProps {
  children: ReactElement<any, any> | null;
}

const Auth: React.FC<IAuthProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { data } = useQuery<IAuthenticationResult>(AUTHENTICATION, {
    errorPolicy: "all",
  });

  useEffect(() => {
    if (data) {
      dispatch(setAuthUserType(data.authenticate.type));

      switch (data.authenticate.type) {
        case UserTypes.Employee:
          dispatch(setAuthEmployee(data.authenticate.employee));
          break;
        case UserTypes.User:
          dispatch(setAuthUser(data.authenticate.user));
          break;

        default:
          break;
      }
    }
  }, [dispatch, data]);

  return children;
};

export default Auth;
