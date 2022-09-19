import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { Container, Content } from "./style";
import { toast } from "react-toastify";
import Mentor from "./mentor";
import AddNewMentor from "./newMentor";
import UsersService from "../../services/UsersServices";

export default function Mentors() {
  // eslint-disable-next-line no-unused-vars
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingMentor, setIsAddingMentor] = useState(false);
  const { token } = useContext(AuthContext);
  const { isMentor } = useContext(UserContext);

  const nav = useNavigate();

  useEffect(() => {
    if (!isMentor) {
      nav("/student");
    }
    getMentors();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  function getMentors() {
    UsersService.getAllFiltered(token, { type: "mentor" })
      .then(({ data }) => {
        setIsLoading(false);
        setMentors(data);
      })
      .catch(() => {
        setIsLoading(false);
        toast.warn("Erro inesperado");
      });
  }

  return (
    <>
      <Container isAddingClass={isAddingMentor}>
        <div>
          <AddNewMentor
            isAddingMentor={isAddingMentor}
            setIsAddingMentor={setIsAddingMentor}
            reloadMentors={getMentors}
          />

          {!isAddingMentor && (
            <button onClick={() => setIsAddingMentor(true)}>
              Novo(a) mentor(a)
            </button>
          )}
        </div>

        <Content>
          <div>
            <p>Mentor(a)</p>
            <p>E-mail</p>
          </div>

          {isLoading && Loader}

          <div>
            {mentors.map(({ id, name, email }) => {
              return <Mentor key={id} id={id} name={name} email={email} />;
            })}
          </div>
        </Content>
      </Container>
    </>
  );
}

const Loader = <ThreeDots color="#FF7BBD" height={80} width={80} />;
