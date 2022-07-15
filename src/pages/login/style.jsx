import styled from "styled-components";

const PageBody = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.form`
  width: 50%;
  max-width: 60rem;
  height: 250px;
  background-color: var(--darker);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 1.5rem;

  @media (max-width: 600px) {
    width: 100%;
    height: calc(100vh - 6rem);
    justify-content: space-evenly;
    border-radius: 0;
  }
`;

export { PageBody, Box };
