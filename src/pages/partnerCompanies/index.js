import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import NavMenu from "../../components/navMenu";
import CompaniesService from "../../services/CompaniesServices";
import Company from "./Company";
import { ThreeDots } from "react-loader-spinner";

export default function PartnerCompanies() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    CompaniesService.getAll()
      .then(({ data }) => {
        setIsLoading(false);
        setCompanies(data.companies);
      })
      .catch(() => {
        setIsLoading(false);
        alert("Erro Inesperado");
      });
  }, []);

  return (
    <>
      <NavMenu />
      <Container>
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
  justify-content: center;
  align-items: flex-start;

  background-color: #000;

  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;

  padding: 2rem 0;
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
