import {
  FabLogoutStyles,
  FabUserStyles,
  Header as HeaderComponent,
  Title,
  UserStyles,
  UserTypeStyles,
} from "./styles";
import { RiLogoutBoxFill, RiUserFill } from "react-icons/ri";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import UserContext from "../../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import UpdateUser from "./updateUser";

const Header = ({ children }) => {
  const { isMentor, setIsMentor } = useContext(UserContext);
  const { setToken } = useContext(AuthContext);
  const { name, setName } = useContext(UserContext);
  const [modalOpened, setModalOpened] = useState(false);
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
        <>
          <Fab
            onClick={() => setModalOpened(true)}
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
          <UpdateUser
            opened={modalOpened}
            setOpened={setModalOpened}
            name={name}
            logout={logout}
          />
        </>
      )}
    </HeaderComponent>
  );
};

export default Header;
