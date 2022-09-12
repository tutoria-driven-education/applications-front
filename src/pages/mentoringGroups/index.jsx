import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UsersService from "../../services/UsersServices";
import MentoringGroup from "./mentoringGroup";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import Select from "react-select";
import { Container, ContainerBox, ContainerSelect, FilterBar } from "./style";
import { useCallback } from "react";
import ClassesService from "../../services/ClassesService";

export default function MentoringGroups() {
  // eslint-disable-next-line no-unused-vars
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isMentor } = useContext(UserContext);
  const { token } = useContext(AuthContext);
  const nav = useNavigate();

  const initialClassesOptions = [{ value: "all", label: "Todas as turmas" }];
  const [classesOptions, setClassesOptions] = useState(initialClassesOptions);
  const [classSelected, setClassSelected] = useState(initialClassesOptions[0]);

  const initalMentorsOptions = [{ label: "Todos mentores", value: "all" }];
  const [mentorsOptions, setMentorsOptions] = useState(initalMentorsOptions);
  const [mentorSelected, setMentorSelected] = useState(initalMentorsOptions[0]);

  useEffect(() => {
    if (!isMentor) {
      nav("/student");
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const search = useCallback(
    async ({ _class, mentor }) => {
      setIsLoading(true);

      try {
        const [mentoringGroups, classes] = await Promise.all([
          UsersService.getMentoringGroups(token, { _class, mentor }),
          ClassesService.getAll(token),
        ]);

        setGroups(mentoringGroups.data);

        if (mentor === "all") {
          const _mentoringGroupsOptions = mentoringGroups.data.map((mentor) => {
            return { label: mentor.name, value: mentor.id };
          });
          setMentorsOptions([
            ...initalMentorsOptions,
            ..._mentoringGroupsOptions,
          ]);
        }

        const _classesOptions = classes.data.map((_class) => {
          return { label: _class.name, value: _class.id };
        });
        setClassesOptions([...initialClassesOptions, ..._classesOptions]);
      } catch (err) {
        console.log(err);
        toast.error("Erro Inesperado");
      }

      setIsLoading(false);
    },
    [token] //eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    search({
      _class: classSelected.value,
      mentor: mentorSelected.value,
    });
  }, [classSelected, mentorSelected]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ContainerBox>
      <FilterBar>
        <ContainerSelect>
          <Select
            isDisabled={isLoading}
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
        <ContainerSelect>
          <Select
            isDisabled={isLoading}
            value={mentorSelected}
            onChange={setMentorSelected}
            options={mentorsOptions}
            defaultValue={mentorsOptions[0]}
            styles={{
              option: (provided, state) => ({ ...provided, cursor: "pointer" }),
              control: (provided) => ({ ...provided, cursor: "pointer" }),
            }}
          />
        </ContainerSelect>
      </FilterBar>
      <Container>
        {isLoading
          ? Loader
          : groups.map(({ id, name: mentorName, Students }) => {
              return (
                <MentoringGroup
                  key={`group-${id}`}
                  mentorName={mentorName}
                  students={Students}
                />
              );
            })}
      </Container>
    </ContainerBox>
  );
}

const Loader = <ThreeDots color="#2C4B7A" height={80} width={80} />;
