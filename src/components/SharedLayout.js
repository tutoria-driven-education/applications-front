/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import UserContext from "../contexts/UserContext";
import validateMethod from "../router/ValidateMethod";
import NavMenu from "./navMenu";

export default function SharedLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isMentor } = useContext(UserContext);
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (pathname === "/") return;
    validateMethod(navigate, token, setToken);
  }, [pathname]);

  return (
    <>
      {pathname !== "/" && isMentor && <NavMenu />}
      <Outlet />
    </>
  );
}
