import styled from "styled-components";

export default function Banner() {
  return (
    <Container>
      <h1>Applications</h1>
    </Container>
  );
}

const Container = styled.div`
  height: 6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ff7bbd;

  font-size: 2.5rem;
  font-weight: 700;
  color: #000;
`;
