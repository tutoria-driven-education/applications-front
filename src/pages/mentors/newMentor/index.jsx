import {useContext, useState} from "react";
import {ThreeDots} from "react-loader-spinner";
import AuthContext from "../../../contexts/AuthContext";
import {toast} from "react-toastify";
import {Container} from "./style";
import UsersService from "../../../services/UsersServices";

export default function AddNewMentor({
                                       isAddingMentor,
                                       setIsAddingMentor,
                                       reloadMentors,
                                     }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mentorName, setMentorName] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const {token} = useContext(AuthContext);

  function saveMentor() {
    setIsLoading(true);
    UsersService.createMentor(token, {
      name: mentorName,
      email: mentorEmail,
      adminPassword: adminPassword,
    })
      .then(() => {
        setIsLoading(false);

        toast.success("Mentor(a) adicionado(a)!");

        setMentorName("");
        setMentorEmail("");
        setAdminPassword("");
        reloadMentors();
      })
      .catch(({response}) => {
        setIsLoading(false);
        if (response.status === 401) {
          toast.error(response.data.message);
          return;
        }

        if (response.status === 400) {
          toast.error("Preencha todos os campos");
          return;
        }

        toast.warn("Erro inesperado");
      });
  }

  return (
    <Container isAddingMentor={isAddingMentor}>
      <input
        type="text"
        placeholder="Nome"
        value={mentorName}
        onChange={(e) => setMentorName(e.target.value)}
        disabled={isLoading}
      />
      &nbsp;
      <input
        type="text"
        placeholder="E-mail"
        value={mentorEmail}
        onChange={(e) => setMentorEmail(e.target.value)}
        disabled={isLoading}
      />
      &nbsp;
      <input
        type="password"
        placeholder="Senha admin"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={() => saveMentor()} disabled={isLoading}>
        {isLoading ? Loader : "Salvar"}
      </button>
      <button onClick={() => setIsAddingMentor(false)}>Voltar</button>
    </Container>
  );
}

const Loader = <ThreeDots color="#FF7BBD" height={20} width={20}/>;
