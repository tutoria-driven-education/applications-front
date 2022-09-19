import styled from "styled-components";

const Container = styled.div`
  height: 9vh;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #525268;

  padding: 1.5rem;
  padding-right: 2.5rem;
  border-radius: 15px;
  margin-bottom: 0.5rem;
  transition: filter 0.2s;
  cursor: pointer;

  &:hover {
    filter: brightness(110%);
  }
`;

const MentorNameHolder = styled.p`
  font-weight: 400;
  font-size: 1.8rem;
`;

export { Container, MentorNameHolder };
