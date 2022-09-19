import styled from "styled-components";

const Header = styled.header`
  background-color: var(--driven-color);
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 3.6rem;
  text-align: center;
  user-select: none;
`;

const FabStyles = {
  backgroundColor: "black",
  color: "white",
  position: "absolute",
  gap: "1rem",
};

const FabLogoutStyles = {
  ...FabStyles,
  left: "1rem",
};

const FabUserStyles = {
  ...FabStyles,
  right: "1rem",
};

const UserStyles = {
  lineHeight: "15px",
  marginTop: "5px",
  maxWidth: "300px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const UserTypeStyles = {
  display: "block",
  fontSize: "1.2rem",
};

export {
  Header,
  Title,
  FabLogoutStyles,
  FabUserStyles,
  UserTypeStyles,
  UserStyles,
};
