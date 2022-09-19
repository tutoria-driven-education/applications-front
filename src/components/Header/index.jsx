import {
  FabLogoutStyles,
  FabUserStyles,
  Header as HeaderComponent,
  Title,
  UserStyles,
  UserTypeStyles,
} from "./styles";
import { RiLogoutBoxFill, RiUserFill } from "react-icons/ri";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import UserContext from "../../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import copyText from "../../utils/copyText";

const Header = ({ children }) => {
  const { isMentor, setIsMentor } = useContext(UserContext);
  const { setToken } = useContext(AuthContext);
  const { name, setName } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    setIsMentor(false);
    setToken("");
    setName("");

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
          sx={FabLogoutStyles}
        >
          <RiLogoutBoxFill size={26} />
          Sair
        </Fab>
      )}
      <Title>{children}</Title>
      {location.pathname !== "/" && (
        <Fab
          onClick={() => copyText(name, "o nome")}
          size="medium"
          variant="extended"
          color="secondary"
          sx={FabUserStyles}
        >
          <RiUserFill size={26} />
          <div style={UserStyles}>
            {name}
            <small style={UserTypeStyles}>
              {isMentor ? "Mentor(a)" : "Aluno(a)"}
            </small>
          </div>
        </Fab>
      )}
    </HeaderComponent>
  );
};

export default Header;
