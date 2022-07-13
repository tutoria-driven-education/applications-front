import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import CompaniesService from "../../services/CompaniesServices";
import Company from "./Company";
import { ThreeDots } from "react-loader-spinner";
import AuthContext from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import AddNewCompany from "./newCompany";

export default function PartnerCompanies() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingCompany, setIsAddingCompany] = useState(false);
  const { token } = useContext(AuthContext);
  const { isMentor } = useContext(UserContext);

  const nav = useNavigate();

  useEffect(() => {
    if (!isMentor) {
      nav("/student");
    }
    getCompanies();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  function getCompanies() {
    CompaniesService.getAll(token)
      .then(({ data }) => {
        setIsLoading(false);
        setCompanies(data.companies);
      })
      .catch(() => {
        setIsLoading(false);
        toast.warn("Erro inesperado");
      });
  }
  return (
    <>
      <Container isAddingCompany={isAddingCompany}>
        <div>
          <AddNewCompany
            isAddingCompany={isAddingCompany}
            setIsAddingCompany={setIsAddingCompany}
            reloadCompanies={getCompanies}
          />

          {!isAddingCompany && (
            <button onClick={() => setIsAddingCompany(true)}>
              Nova empresa
            </button>
          )}
        </div>

        <Content>
          <div>
            <p>Empresa</p>
            <p>Parceira?</p>
          </div>

          {isLoading && Loader}

          <div>
            {companies.map(({ id, name, is_partner }) => {
              return (
                <Company key={id} id={id} name={name} isPartner={is_partner} />
              );
            })}
          </div>
        </Content>
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

    margin-bottom: 2rem;
  }

  & > div:last-child {
    width: 90%;
    max-height: 60vh;

    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Loader = <ThreeDots color="#2C4B7A" height={80} width={80} />;
