import styled from "styled-components";

const Container = styled.div`
  height: 86vh;
  width: 100vw;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  background-color: #000;

  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;

  padding: 2rem 0;

  & > div:first-child {
    width: 70vw;
    display: flex;
    justify-content: flex-end;

    & > button {
      width: 10rem;

      margin-left: 0.5rem;
      border-radius: 4px;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
    }
  }
`;

const Content = styled.div`
  min-height: 48vh;
  width: 70vw;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  background-color: #7d7d8e;

  margin: 1rem 0;
  border-radius: 15px;
  padding: 1rem;

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    width: 90%;

    margin: 1rem 0;
    padding: 0 3.5rem 0 1.5rem;
    font-size: 1.8rem;
  }

  & > div:last-child {
    width: 90%;
    max-height: 60vh;

    overflow: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 3rem;
    }

    ::-webkit-scrollbar-track {
      background-color: var(--darker);
      border: 1rem solid var(--dark);
      border-radius: 2rem;
    }

    ::-webkit-scrollbar-thumb {
      height: 3rem;
      background: var(--driven-color);
      border: 0.5rem solid var(--dark);
      border-radius: 50%;
    }
  }
`;

export { Container, Content };
