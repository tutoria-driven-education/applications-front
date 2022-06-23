import styled from "styled-components";
import NavButton from "./Navbutton";

export default function NavMenu() {
  return (
    <Container>
      <NavButton buttonText="Alunos" route="/1" />
      <NavButton buttonText="Dashboard" route="/2" />
      <NavButton buttonText="Empresas parceiras" route="/partner-companies" />
      <NavButton buttonText="Grupos mentoria" route="/mentoring-groups" />
    </Container>
  );
}

const Container = styled.nav`
  height: 7vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`;
