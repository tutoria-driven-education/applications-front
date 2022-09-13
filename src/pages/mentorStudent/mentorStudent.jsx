import ClassesService from "../../services/ClassesService";
import Select from "react-select";
import AuthContext from "../../contexts/AuthContext";
import Message from "../../components/Message";
import UserContext from "../../contexts/UserContext";
import fomatData from "../../utils/fomatData";
import ApplicationsList from "../../components/ListComponents/List";
import SearchService from "../../services/SearchService";
import { Section } from "../../components";
import { SectionTitle } from "../../components/Section/styles";
import { useContext, useEffect, useState } from "react";
import { FaExpandAlt, FaHeartBroken, FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ContainerSelect } from "./style";
import {
  Button,
  Fab,
  FormControlLabel,
  InputAdornment,
  Radio,
  TextField,
} from "@mui/material";
import {
  Container,
  CustomRadioGroup,
  ResultSection,
  StudentSection,
  StudentTitleName,
} from "./mentorStudent.styles";

const initialClassesOptions = [{ value: "all", label: "Todas as turmas" }];

const MentorStudent = () => {
  const [searchFilter, setSearchFilter] = useState("student");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const { isMentor } = useContext(UserContext);
  const { token } = useContext(AuthContext);
  const [classesOptions, setClassesOptions] = useState(initialClassesOptions);
  const [classSelected, setClassSelected] = useState(initialClassesOptions[0]);

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
        data = data.filter((item) => {
          if (classSelected.value === 'all') return true
          else return classSelected.value === item.class_id
        });
        const filteredData = data.map((item) => {
          return {
            ...item,
            Application: fomatData(item.Application),
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
          searchFilter === "company"
            ? toast.warning("Nenhuma Aplicação para esta empresa até o momento")
            : toast.error(
              `${searchFilter === "student"
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

  const searchClasses = useCallback(async () => {
    try {
      const { data } = await ClassesService.getAll(token);
      const _classesOptions = data.map((_class) => {
        return { label: _class.name, value: _class.id };
      });
      setClassesOptions([...initialClassesOptions, ..._classesOptions]);
    } catch (error) {
      toast.error('Erro ao buscar turmas');
    }
  }, [token])

  useEffect(() => {
    searchClasses()
  }, [])

  return (
    <Container>
      <Section title={"Barra de pesquisa:"}>
        <CustomRadioGroup onSubmit={handleSubmit} defaultValue={"student"} row style={{ alignItems: "center" }}>
          <ContainerSelect>
            <Select
              value={classSelected}
              onChange={setClassSelected}
              options={classesOptions}
              defaultValue={classesOptions[0]}
              styles={{
                option: (provided, state) => ({ ...provided, cursor: "pointer" }),
                control: (provided) => ({ ...provided, cursor: "pointer" }),
              }}
            />
          </ContainerSelect>
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
                    setApplications={() => { }}
                    isMentorPage={true}
                    token={token}
                  />
                ) : (
                  element.expanded && (
                    <Message>
                      <FaHeartBroken size={24} color={"black"} />
                      {"Nenhuma aplicação até o momento "}
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
