import { RadioGroup } from "@mui/material";
import styled from "styled-components";
import { StyledSection } from "../../components/Section/Section.styles";

const Container = styled.main`
  background-color: #000;
  min-height: calc(100vh - 6rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  span {
    color: white;
  }
`;

const ResultSection = styled(StyledSection)`
  border: none;
  border-top: 1px solid var(--driven-color);
  border-radius: 0;
  margin-top: 3rem;
  color: white;
`;

const CustomRadioGroup = styled(RadioGroup)`
  display: flex;
`;

export { Container, ResultSection, CustomRadioGroup };
