import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import AuthContext from "../../../contexts/AuthContext";
import CompaniesServices from "../../../services/CompaniesServices";
import { toast } from "react-toastify";
import { Container } from "./style";

export default function AddNewClass({
  isAddingClass,
  setIsAddingClass,
  reloadClasses,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [className, setClassName] = useState("");
  const { token } = useContext(AuthContext);

  function saveClass() {
    setIsLoading(true);
    CompaniesServices.createCompany(className, token)
      .then(() => {
        setIsLoading(false);

        toast.success("Turma adicionada!");

        setClassName("");
        reloadClasses();
      })
      .catch(() => {
        setIsLoading(false);
        toast.warn("Erro inesperado");
      });
  }

  return (
    <Container isAddingClass={isAddingClass}>
      <input
        type="text"
        placeholder="Nome da turma"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={() => saveClass()} disabled={isLoading}>
        {isLoading ? Loader : "Salvar"}
      </button>
      <button onClick={() => setIsAddingClass(false)}>Voltar</button>
    </Container>
  );
}

const Loader = <ThreeDots color="#FF7BBD" height={20} width={20} />;
