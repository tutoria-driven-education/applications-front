import { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../contexts/AuthContext";
import CompaniesService from "../../services/CompaniesServices";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function Company({ id, name, isPartner, reloadCompanies }) {
  const [isChecked, setIsChecked] = useState(isPartner);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const updatePartnershipStatus = (status) => {
    setIsLoading(true);
    CompaniesService.changePartnership(id, token)
      .then(() => {
        setIsChecked(!isChecked);
        setIsLoading(false);
      })
      .catch(() => {
        toast.warn("Erro inesperado");
        setIsLoading(false);
      });
  };

  return (
    <Container onClick={() => updatePartnershipStatus(!isChecked)}>
      <CompanyNameHolder>{name}</CompanyNameHolder>
      {isLoading ? Loader : <CheckButton isChecked={isChecked} />}
    </Container>
  );
}

const Container = styled.div`
  height: 9vh;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #525268;

  padding: 1.5rem;
  padding-right: 2.5rem;
  border-radius: 15px;
  margin-bottom: 0.5rem;
  transition: filter 0.2s;
  cursor: pointer;

  &:hover {
    filter: brightness(110%);
  }
`;

const CompanyNameHolder = styled.p`
  font-weight: 400;
  font-size: 1.8rem;
`;

const CheckButton = styled.button`
  height: 2rem;
  width: 2rem;
  cursor: pointer;

  background-color: ${({ isChecked }) => (isChecked ? "#FF7BBD" : "#E0E0E0")};

  border: none;
  border-radius: 50%;
`;

const Loader = <ThreeDots color="#FF7BBD" height={30} width={30} />;
