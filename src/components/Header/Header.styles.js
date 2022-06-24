import styled from "styled-components";

const Header = styled.header`
  background-color: var(--driven-color);
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-weight: bold;
    font-size: 3.6rem;
    user-select: none;
  }
`;

export { Header };
