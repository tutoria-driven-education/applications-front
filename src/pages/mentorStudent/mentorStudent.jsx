import {
  Container,
  CustomRadioGroup,
  ResultSection,
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
import { FaSearch } from "react-icons/fa";
import SearchService from "../../services/SearchService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import List from "../../components/ListComponents/List/List";

const MentorStudent = () => {
  const [searchFilter, setSearchFilter] = useState("student");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    SearchService.search({ name: input, type: searchFilter })
      .then(({ data }) => {
        console.log("DADOS -> ", data);
        if (data.length) {
          setResult(data);
          setInput("");
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
      .catch(({ response }) => console.error(response));
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
            <SectionTitle>Resultado</SectionTitle>
            <List
              array={result}
              setApplications={() => {}}
              isMentorPage={true}
            />
          </ResultSection>
        )}
      </Section>
    </Container>
  );
};

export default MentorStudent;
