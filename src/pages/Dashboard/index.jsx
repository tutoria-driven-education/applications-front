import Select from "react-select";
import UserContext from "../../contexts/UserContext";
import AuthContext from "../../contexts/AuthContext";
import UsersService from "../../services/UsersServices";
import ApplicationService from "../../services/ApplicationsService";
import ClassesService from "../../services/ClassesService";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RangePicker } from "../../components/FormData/RangePicker";
import { DashboardChartDoughnut } from "./DashboardCards/DashboardChartDoughnut";
import { DashboardCharLine } from "./DashboardCards/DashboardCharLine";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import { lineCharts } from "./constants/lineCharts";
import { getFirstDayOfTheMonth } from "./utils/getFirstDayOfTheMonth";
import { getCorrectDateFilter } from "./utils/getCorrectDateFilter";
import { doughnutCharts } from "./constants/doughnutCharts";
import { getAtualDate } from "./utils/getAtualDate";
import { debounceEvent } from "./utils/debounceEvent";
import {
  Container,
  ContaineRangePicker,
  ContainerSelect,
  FilterBar,
  Line,
} from "./style";

const debounce = debounceEvent();

const initalRange = { from: getFirstDayOfTheMonth(), to: getAtualDate() };

function Dashboard() {
  const initialClassesOptions = [{ value: "all", label: "Todas as turmas" }];
  const initialCompaniesTypesOptions = [
    { label: "Todas empresas", value: "all" },
    { label: "Empresas Parceiras", value: "inPartner" },
    { label: "Outras empresas", value: "inOther" },
  ];
  const initalMentorsOptions = [{ label: "Todos mentores", value: "all" }];

  const [classesOptions, setClassesOptions] = useState(initialClassesOptions);

  const [mentorsOptions, setMentorsOptions] = useState(initalMentorsOptions);

  const [classSelected, setClassSelected] = useState(initialClassesOptions[0]);
  const [companyTypeSelected, setCompanyTypeSelected] = useState(
    initialCompaniesTypesOptions[0]
  );
  const [mentorSelected, setMentorSelected] = useState(initalMentorsOptions[0]);
  const [rangeSelected, setRangeSelected] = useState(initalRange);

  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState(null);

  const { token } = useContext(AuthContext);
  const { isMentor } = useContext(UserContext);

  const nav = useNavigate();

  const search = useCallback(
    async ({ _class, companyType, mentor, date_init, date_end }) => {
      setLoading(true);
      try {
        const [applications, mentoringGroups, classes] = await Promise.all([
          ApplicationService.searchApplications(token, {
            _class,
            companyType,
            mentor,
            date_init,
            date_end,
          }),
          UsersService.getMentoringGroups(token, {}),
          ClassesService.getAll(token),
        ]);
        const _mentoringGroupsOptions = mentoringGroups.data.map((mentor) => {
          return { label: mentor.name, value: mentor.id };
        });
        const _classesOptions = classes.data.map((_class) => {
          return { label: _class.name, value: _class.id };
        });
        setClassesOptions([...initialClassesOptions, ..._classesOptions]);
        setStats(applications.data);
        setMentorsOptions([
          ...initalMentorsOptions,
          ..._mentoringGroupsOptions,
        ]);
      } catch (err) {
        console.log(err);
        toast.error("Erro ao buscar dashboard");
      }
      setLoading(false);
    },
    [token] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (!isMentor) nav("/student");
  }, [isMentor]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    search({
      _class: classSelected.value,
      companyType: companyTypeSelected.value,
      mentor: mentorSelected.value,
      date_init: getCorrectDateFilter(
        rangeSelected.from ? rangeSelected.from : rangeSelected.to
      ),
      date_end: getCorrectDateFilter(
        rangeSelected.to ? rangeSelected.to : rangeSelected.from
      ),
    });
  }, [classSelected, mentorSelected, rangeSelected, companyTypeSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  window.onresize = () => {
    setLoading(true);
    debounce(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Container>
      <FilterBar>
        <ContainerSelect>
          <Select
            isDisabled={loading}
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
            isDisabled={loading}
            value={companyTypeSelected}
            onChange={setCompanyTypeSelected}
            options={initialCompaniesTypesOptions}
            defaultValue={initialCompaniesTypesOptions[0]}
            styles={{
              option: (provided, state) => ({ ...provided, cursor: "pointer" }),
              control: (provided) => ({ ...provided, cursor: "pointer" }),
            }}
          />
        </ContainerSelect>

        <ContainerSelect>
          <Select
            isDisabled={loading}
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

        <ContaineRangePicker>
          <RangePicker
            disabled={loading}
            onChange={(newRange) => setRangeSelected({ ...newRange })}
            initialRange={initalRange}
            noRemove
          />
        </ContaineRangePicker>
      </FilterBar>
      {stats && !loading && (
        <>
          <Line style={{ gap: "3rem", flexWrap: "wrap" }}>
            {doughnutCharts.map(({ title, attribute }) => (
              <DashboardChartDoughnut
                key={title}
                title={title}
                infos={stats[attribute].total.values}
                labels={stats[attribute].total.names}
                colors={stats[attribute].total.colors}
                minWidth={400}
                minHeight={350}
              />
            ))}
          </Line>
          {lineCharts.map(({ title, attribute }) => (
            <Line key={title}>
              <DashboardCharLine
                key={title}
                title={title}
                infos={stats[attribute].per_days}
                labels={stats.days}
                minWidth={300}
                minHeight={350}
              />
            </Line>
          ))}
        </>
      )}
      {!(stats && !loading) && (
        <>
          <Line style={{ gap: "3rem", flexWrap: "wrap" }}>
            {doughnutCharts.map(({ title, attribute }) => (
              <Skeleton
                key={`${title}-skeleton`}
                variant="rectangular"
                animation="wave"
                style={{ minWidth: 400, borderRadius: 5, flex: 1, height: 350 }}
              />
            ))}
          </Line>

          {lineCharts.map(({ title, attribute }) => (
            <Line key={`${title}-skeleton`}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                style={{ minWidth: 400, borderRadius: 5, flex: 1, height: 350 }}
              />
            </Line>
          ))}
        </>
      )}
      {loading && "..."}
    </Container>
  );
}

export default Dashboard;
