import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "./styles";

export default function Navbutton({ route, buttonText }) {
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
