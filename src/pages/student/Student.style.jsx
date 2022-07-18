import styled from "styled-components";

const Container = styled.main`
  background-color: #000;
  min-height: calc(100vh - 6rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 4rem 4rem 3rem 4rem;
  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
  }
`;

export { Container };
