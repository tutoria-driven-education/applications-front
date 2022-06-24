import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Company({ id, name, isPartner }) {
  const [isChecked, setIsChecked] = useState(isPartner);

  const updatePartnershipStatus = (status) => {
    setIsChecked(!isChecked);
  };

  return (
    <Container>
      <CompanyNameHolder>{name}</CompanyNameHolder>
      <CheckButton
        onClick={() => updatePartnershipStatus(!isChecked)}
        isChecked={isChecked}
      />
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
`;

const CompanyNameHolder = styled.p`
  font-weight: 400;
  font-size: 1.5rem;
`;

const CheckButton = styled.button`
  height: 1rem;
  width: 1rem;

  background-color: ${({ isChecked }) => (isChecked ? "#FF7BBD" : "#E0E0E0")};

  border: none;
  border-radius: 5px;
`;
