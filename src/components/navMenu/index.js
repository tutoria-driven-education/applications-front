import styled from "styled-components";
import NavButton from "./Navbutton";

export default function NavMenu() {
  return (
    <Container>
      <NavButton buttonText="Aplicações" route="/mentor" />
      <NavButton buttonText="Dashboard" route="/dashboard" />
      <NavButton buttonText="Empresas parceiras" route="/partner-companies" />
      <NavButton buttonText="Grupos mentoria" route="/mentoring-groups" />
    </Container>
  );
}

const Container = styled.nav`
  height: 5vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;
