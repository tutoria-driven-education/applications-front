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
  left: "1rem",
  gap: "1rem",
};

export { Header, Title, FabStyles };
