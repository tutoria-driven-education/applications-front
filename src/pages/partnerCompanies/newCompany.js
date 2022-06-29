import { useContext, useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import AuthContext from "../../contexts/AuthContext";
import CompaniesServices from "../../services/CompaniesServices";
import { toast } from "react-toastify";

export default function AddNewCompany({
  isAddingCompany,
  setIsAddingCompany,
  reloadCompanies,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const { token } = useContext(AuthContext);

  function saveCompany() {
    setIsLoading(true);
    CompaniesServices.createCompany(companyName, token)
      .then(() => {
        setIsLoading(false);

        toast.success("Empresa adicionada!");

        setCompanyName("");
        reloadCompanies();
      })
      .catch(() => {
        setIsLoading(false);
        toast.warn("Erro inesperado");
      });
  }

  return (
    <Container isAddingCompany={isAddingCompany}>
      <input
        type="text"
        placeholder="Nome da empresa"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={() => saveCompany()} disabled={isLoading}>
        {isLoading ? Loader : "Salvar"}
      </button>
      <button onClick={() => setIsAddingCompany(false)}>Voltar</button>
    </Container>
  );
}

const Container = styled.div`
  width: 70vw;
  display: ${({ isAddingCompany }) => (isAddingCompany ? "flex" : "none")};
  justify-content: space-between;

  button,
  input {
    border-radius: 4px;
    border: none;
    padding: 0.5rem;
  }

  button {
    width: 6rem;
    margin-left: 0.5rem;
  }

  input {
    width: calc(70vw - 12rem);
  }

  padding: 1rem;

  svg {
    margin: 0 auto;
  }
`;

const Loader = <ThreeDots color="#2C4B7A" height={20} width={20} />;
