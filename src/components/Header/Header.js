import { FabStyles, Header as HeaderComponent, Title } from "./Header.styles";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import UserContext from "../../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";

const Header = ({ children }) => {
  const { setIsMentor } = useContext(UserContext);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    setIsMentor(false);
    setToken("");

    window.localStorage.clear();

    navigate("/");
  }

  return (
    <HeaderComponent>
      {location.pathname !== "/" && (
        <Fab
          onClick={logout}
          size="medium"
          variant="extended"
          color="secondary"
          sx={FabStyles}
        >
          <RiLogoutBoxFill size={26} />
          Sair
        </Fab>
      )}
      <Title>{children}</Title>
    </HeaderComponent>
  );
};

export default Header;
