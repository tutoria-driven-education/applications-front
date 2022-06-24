import { useEffect, useState } from "react";
import styled from "styled-components";
import NavMenu from "../../components/navMenu";
import UsersService from "../../services/UsersServices";
import MentoringGrouop from "./MentoringGroup";

export default function MentoringGrouops() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    UsersService.getMentoringGroups().then(({ data }) => setGroups(data));
  }, []);

  return (
    <>
      <NavMenu />
      <Container>
        {groups.map(({ id, name: mentorName, Students }) => {
          return (
            <MentoringGrouop
              key={`group-${id}`}
              mentorName={mentorName}
              students={Students}
            />
          );
        })}
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 86vh;
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
