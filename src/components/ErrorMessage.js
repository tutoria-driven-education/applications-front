import styled from "styled-components";
export default function ErrorMessage() {
  return (
    <Main>
      <h1>Não tem nada nessa página, você está perdido? 🤔</h1>
    </Main>
  );
}

const Main = styled.main`
  color: #ff7bbd;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  h1 {
    font-size: 30px;
  }
`;
