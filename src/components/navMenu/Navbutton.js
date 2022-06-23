import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function NavButton({ route, buttonText }) {
  const nav = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <Container
      onClick={() => nav(route)}
      route={route}
      isSelected={currentRoute === route}
    >
      {buttonText}
    </Container>
  );
}

const Container = styled.button`
  background-color: ${({ isSelected }) => (isSelected ? "#AAAAAA" : "#d9d9d9")};

  overflow: hidden;

  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;

  border: none;
  height: 100%;
  width: 100%;

  @media (max-width: 900px) {
    font-size: 1rem;
  }
`;
