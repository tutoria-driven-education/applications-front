import { Header as HeaderComponent } from "./Header.styles";

const Header = ({ children }) => {
  return (
    <HeaderComponent>
      <h1>{children}</h1>
    </HeaderComponent>
  );
};

export default Header;
