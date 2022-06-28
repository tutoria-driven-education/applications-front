import {
  Container,
  CustomRadioGroup,
  ResultSection,
  StudentSection,
  StudentTitleName,
} from "./mentorStudent.styles";
import NavMenu from "../../components/navMenu";
import { Section } from "../../components";
import { SectionTitle } from "../../components/Section/Section.styles";
import {
  Button,
  FormControlLabel,
  InputAdornment,
  Radio,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { FaExpandAlt, FaHeartBroken, FaSearch } from "react-icons/fa";
import SearchService from "../../services/SearchService";
import { toast } from "react-toastify";
import ApplicationsList from "../../components/ListComponents/List/List";
import dataFormatter from "../../utils/dataFormatter";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Message from "../../components/Message/Message";

const MentorStudent = () => {
  const [searchFilter, setSearchFilter] = useState("student");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    SearchService.search({ name: input, type: searchFilter })
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
              ? `Nenhuma aplicação encontrada para os(as) alunos(as) selecionados`
              : `Nenhum aluno(a) do mentor(a) aplicou para alguma vaga até o momento`
          );
        } else {
          toast.error(
            `Nenhum ${
              searchFilter === "student"
                ? "aluno(a) encontrado(a)"
                : "mentor(a) encontrado(a)"
            }`
          );
        }
      })
      .catch((error) => console.error(error.response || error));
  }

  function expandPanel(id) {
    const student = result.find((elem) => elem.id === id);
    student.expanded = !student.expanded;
    console.log(result);
    setResult([...result]);
  }

  return (
    <Container>
      <NavMenu />
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
          <TextField
            sx={{ flexGrow: 1, marginLeft: "auto" }}
            variant="filled"
            label={
              searchFilter === "student"
                ? "Pesquise pelo nome de um(a) aluno(a)"
                : "Pesquise pelo nome de um(a) mentor(a)"
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
                  />
                ) : (
                  element.expanded && (
                    <Message>
                      <FaHeartBroken size={24} /> Nenhuma aplicação até o
                      momento <FaHeartBroken size={24} />
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
