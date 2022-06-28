import { RadioGroup } from "@mui/material";
import styled from "styled-components";
import {
  SectionTitle,
  StyledSection,
} from "../../components/Section/Section.styles";

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

const StudentSection = styled(StyledSection)`
  background-color: var(--dark);
  border: none;
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: ${(props) =>
    props.expanded ? "var(--dark)" : "rgba(0,0,0,0)"};
`;

const StudentTitleName = styled(SectionTitle)`
  background-color: ${(props) =>
    props.expanded ? "var(--darker)" : "rgba(0,0,0,0)"};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border-radius: 2rem;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  transition: top 0.4s, left 0.4s;
  top: ${(props) => (props.expanded ? "-1.8rem" : "0")};
  left: ${(props) => (props.expanded ? "4.2rem" : "0")};
`;

const CustomRadioGroup = styled(RadioGroup)`
  display: flex;
`;

export {
  Container,
  ResultSection,
  CustomRadioGroup,
  StudentSection,
  StudentTitleName,
};
