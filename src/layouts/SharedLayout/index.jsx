/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import UserContext from "../../contexts/UserContext";
import validateRoute from "../../utils/validateRoute";
import NavMenu from "../../components/NavMenu";

export default function SharedLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isMentor } = useContext(UserContext);
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (pathname === "/") return;

    validateRoute(navigate, token, setToken);
  }, [pathname]);

  return (
    <>
      {pathname !== "/" && isMentor && <NavMenu />}
      <Outlet />
    </>
  );
}
