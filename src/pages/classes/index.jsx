import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { Container, Content } from "./style";
import { toast } from "react-toastify";
import AddNewClass from "./newClass";
import Class from "./class";
import ClassesService from "../../services/ClassesService";

export default function Classes() {
  // eslint-disable-next-line no-unused-vars
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const { token } = useContext(AuthContext);
  const { isMentor } = useContext(UserContext);

  const nav = useNavigate();

  useEffect(() => {
    if (!isMentor) {
      nav("/student");
    }
    getClasses();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  function getClasses() {
    ClassesService.getAll(token)
      .then(({ data }) => {
        setIsLoading(false);
        setClasses(data);
      })
      .catch(() => {
        setIsLoading(false);
        toast.warn("Erro inesperado");
      });
  }

  return (
    <>
      <Container isAddingClass={isAddingClass}>
        <div>
          <AddNewClass
            isAddingClass={isAddingClass}
            setIsAddingClass={setIsAddingClass}
            reloadClasses={getClasses}
          />

          {!isAddingClass && (
            <button onClick={() => setIsAddingClass(true)}>Nova turma</button>
          )}
        </div>

        <Content>
          <div>
            <p>Turma</p>
            <p>Copiar link</p>
          </div>

          {isLoading && Loader}

          <div>
            {classes.map(({ id, name }) => {
              return <Class key={id} id={id} name={name} />;
            })}
          </div>
        </Content>
      </Container>
    </>
  );
}

const Loader = <ThreeDots color="#FF7BBD" height={80} width={80} />;
