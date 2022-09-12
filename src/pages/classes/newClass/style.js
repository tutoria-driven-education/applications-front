import styled from "styled-components";

const Container = styled.div`
  width: 70vw;
  display: ${({ isAddingClass }) => (isAddingClass ? "flex" : "none")};
  justify-content: space-between;

  button,
  input {
    border-radius: 4px;
    border: none;
    padding: 0.5rem;
    outline: none;
  }

  button {
    width: 6rem;
    margin-left: 0.5rem;
    cursor: pointer;
  }

  input {
    width: calc(70vw - 12rem);
  }

  padding: 1rem;

  svg {
    margin: 0 auto;
  }
`;

export {Container};
