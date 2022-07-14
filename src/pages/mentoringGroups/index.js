import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UsersService from "../../services/UsersServices";
import MentoringGrouop from "./MentoringGroup";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function MentoringGrouops() {
  // eslint-disable-next-line no-unused-vars
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isMentor } = useContext(UserContext);
  const { token } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    if (!isMentor) {
      nav("/");
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    UsersService.getMentoringGroups(token)
      .then(({ data }) => {
        setIsLoading(false);
        setGroups(data);
      })
      .catch(() => {
        setIsLoading(false);
        toast.warn("Erro Inesperado");
      });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Container>
        {isLoading
          ? Loader
          : groups.map(({ id, name: mentorName, Students }) => {
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

const Loader = <ThreeDots color="#2C4B7A" height={80} width={80} />;
