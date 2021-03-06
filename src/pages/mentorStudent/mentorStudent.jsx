import {
  Container,
  CustomRadioGroup,
  ResultSection,
  StudentSection,
  StudentTitleName,
} from "./mentorStudent.styles";
import { Section } from "../../components";
import { SectionTitle } from "../../components/Section/Section.styles";
import {
  Button,
  Fab,
  FormControlLabel,
  InputAdornment,
  Radio,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { FaExpandAlt, FaHeartBroken, FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import SearchService from "../../services/SearchService";
import { toast } from "react-toastify";
import ApplicationsList from "../../components/ListComponents/List/List";
import dataFormatter from "../../utils/dataFormatter";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Message from "../../components/Message/Message";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";

const MentorStudent = () => {
  const [searchFilter, setSearchFilter] = useState("student");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const { isMentor } = useContext(UserContext);
  const { token } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    if (!isMentor) {
      nav("/student");
      return;
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(event) {
    event.preventDefault();
    SearchService.search({ name: input, type: searchFilter }, token)
      .then(({ data }) => {
        const filteredData = data.map((item) => {
          return {
            ...item,
            Application: dataFormatter(item.Application),
            expanded: false,
          };
        });
        if (filteredData.length) {
          setResult(filteredData);
          setInput("");
        } else if (filteredData.length === 0 && data.length !== 0) {
          toast.error(
            searchFilter === "student"
              ? `Nenhuma aplica????o encontrada para os(as) alunos(as) selecionados`
              : `Nenhum aluno(a) do mentor(a) aplicou para alguma vaga at?? o momento`
          );
        } else {
          searchFilter === "company"
            ? toast.warning("Nenhuma Aplica????o para esta empresa at?? o momento")
            : toast.error(
                `${
                  searchFilter === "student"
                    ? "Nenhum aluno(a) encontrado(a)"
                    : "Nenhum mentor(a) encontrado(a)"
                }`
              );
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error.response.message || error);
      });
  }

  function expandPanel(id) {
    const student = result.find((elem) => elem.id === id);
    student.expanded = !student.expanded;
    setResult([...result]);
  }

  function resetSearch() {
    setResult(null);
  }

  return (
    <Container>
      <Section title={"Barra de pesquisa:"}>
        <CustomRadioGroup onSubmit={handleSubmit} defaultValue={"student"} row>
          <FormControlLabel
            value="student"
            control={
              <Radio
                color="secondary"
                onChange={(event) => {
                  setSearchFilter(event.target.value);
                }}
              />
            }
            label="Aluno(a)"
          />
          <FormControlLabel
            value="mentor"
            control={
              <Radio
                onChange={(event) => {
                  setSearchFilter(event.target.value);
                }}
              />
            }
            label="Mentor(a)"
          />
          <FormControlLabel
            value="company"
            control={
              <Radio
                onChange={(event) => {
                  setSearchFilter(event.target.value);
                }}
              />
            }
            label="Empresa"
          />
          <TextField
            sx={{ flexGrow: 1, marginLeft: "auto" }}
            variant="filled"
            label={
              searchFilter === "student"
                ? "Pesquise pelo nome de um(a) aluno(a)"
                : searchFilter === "mentor"
                ? "Pesquise pelo nome de um(a) mentor(a)"
                : "Pesquise pelo nome de uma empresa"
            }
            value={input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    sx={{ borderRadius: 10, padding: 1.2 }}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    <FaSearch color="black" size={24} />
                  </Button>
                </InputAdornment>
              ),
            }}
            onChange={(event) => setInput(event.target.value)}
          />
        </CustomRadioGroup>
        {result !== null && result.length && (
          <ResultSection>
            <SectionTitle>
              {result.length > 1 ? "Resultados" : "Resultado"}
            </SectionTitle>
            <Fab
              sx={{ position: "absolute", top: "-2.6rem", right: "10rem" }}
              color="primary"
              size="medium"
              onClick={resetSearch}
            >
              <GrClose />
            </Fab>
            {result.map((element) => (
              <StudentSection expanded={element.expanded} key={element.id}>
                <StudentTitleName
                  expanded={element.expanded}
                  onClick={() => expandPanel(element.id)}
                >
                  {element.expanded ? (
                    <BsFillPersonLinesFill size={24} color="white" />
                  ) : (
                    <FaExpandAlt size={24} color="white" />
                  )}
                  {element.name}
                </StudentTitleName>
                {element.expanded && element.Application.length ? (
                  <ApplicationsList
                    array={element.Application}
                    setApplications={() => {}}
                    isMentorPage={true}
                    token={token}
                  />
                ) : (
                  element.expanded && (
                    <Message>
                      <FaHeartBroken size={24} color={"black"} />
                      {"Nenhuma aplica????o at?? o momento "}
                      <FaHeartBroken size={24} color={"black"} />
                    </Message>
                  )
                )}
              </StudentSection>
            ))}
          </ResultSection>
        )}
      </Section>
    </Container>
  );
};

export default MentorStudent;
