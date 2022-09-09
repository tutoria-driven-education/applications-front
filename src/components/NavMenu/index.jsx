import Navbutton from "./NavButton";
import { Container } from "./styles";

const NavMenu = () => {
  return (
    <Container>
      <Navbutton buttonText="Aplicações" route="/mentor" />
      <Navbutton buttonText="Dashboard" route="/dashboard" />
      <Navbutton buttonText="Empresas parceiras" route="/partner-companies" />
      <Navbutton buttonText="Grupos mentoria" route="/mentoring-groups" />
      <Navbutton buttonText="Turmas" route="/classes" />
    </Container>
  );
};

export default NavMenu;
