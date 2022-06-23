import { useState } from "react";
import styled from "styled-components";
import Company from "./Company";

export default function PartnerCompanies() {
  const [companies, setCompanies] = useState([]);

  return (
    <Container>
      <Content>
        <div>
          <p>Empresa</p>
          <p>Parceira?</p>
        </div>

        <div>
          {companies.map(({ id, name, isPartner }) => {
            return (
              <Company key={id} id={id} name={name} isPartner={isPartner} />
            );
          })}
        </div>
      </Content>
    </Container>
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
