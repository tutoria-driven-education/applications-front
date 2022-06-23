import { useState } from "react";
import styled from "styled-components";
import MentoringGrouop from "./MentoringGroup";

export default function MentoringGrouops() {
  const [groups, setGroups] = useState([]);

  return (
    <Container>
      {groups.map(({ id, mentor, students }) => {
        return (
          <MentoringGrouop
            key={`group-${id}`}
            mentorName={mentor}
            students={students}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  background-color: #000;

  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;

  padding: 2rem 0;
`;
