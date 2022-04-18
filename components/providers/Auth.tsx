import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAuthUser } from "../../store/actions";

interface IAuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<IAuthProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setAuthUser({ id: 1, firstName: "Jim", lastName: "Holden", role: "user" }) // TODO: Modify it after adding auth logic
    );
  }, [dispatch]);

  return <>{children}</>;
};

export default Auth;
