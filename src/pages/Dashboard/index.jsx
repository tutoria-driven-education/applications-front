import Select from "react-select";
import UserContext from "../../contexts/UserContext";
import AuthContext from "../../contexts/AuthContext";
import UsersService from "../../services/UsersServices";
import ApplicationService from "../../services/ApplicationsService";
import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RangePicker } from "../../components/FormData/RangePicker";
import { DashboardChartDoughnut } from "./DashboardCards/DashboardChartDoughnut";
import { DashboardCharLine } from "./DashboardCards/DashboardCharLine";
import { Container, FilterBar, Line, ContainerSelect, ContaineRangePicker } from "./styles";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";

const correct_date_filter = (date) => {
  const day = `${Number.parseInt(date.day) > 9 ? Number.parseInt(date.day) : `0${Number.parseInt(date.day)}`}`
  const month = `${Number.parseInt(date.month) > 9 ? Number.parseInt(date.month) : `0${Number.parseInt(date.month)}`}`
  const year = date.year
  return `${day}/${month}/${year}`
}

const getFirstDayOfTheMonth = () => {
  const date = new Date();
  const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
  return {
    day: newDate.getDate(),
    month: newDate.getMonth() + 1,
    year: newDate.getFullYear()
  }
}

const getAtualDate = () => {
  const date = new Date();
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  }
}

const debounceEvent = () => {
  let timer = null
  return (fn, wait) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(), wait)
  }
}

const debounce = debounceEvent()

const initalRange = { from: getFirstDayOfTheMonth(), to: getAtualDate() }

const DoughnutCharts = [
  {
    title: "Aplicações (Empresas Parceiras X Outras)",
    attribute: 'companies'
  },
  {
    title: "Aplicações por Vaga",
    attribute: 'jobs'
  },
  {
    title: "Aplicações por Status",
    attribute: 'status'
  }
]

const LineCharts = [
  {
    title: "Aplicações ao longo do período",
    attribute: 'total'
  },
  {
    title: "Aplicações ao longo do período (Empresas Parceiras X Outras)",
    attribute: 'companies'
  },
  {
    title: "Aplicações por vaga ao longo do período",
    attribute: 'jobs'
  }
]

function Dashboard() {
  const initalMentorsOptions = [{ label: "Todos mentores", value: "all" }];
  const initialCompaniesTypesOptions = [
    { label: "Todas empresas", value: "all" },
    { label: "Empresas Parceiras", value: "inPartner" },
    { label: "Outras empresas", value: "inOther" }
  ];

  const [mentorsOptions, setMentorsOptions] = useState(initalMentorsOptions);

  const [companyTypeSelected, setCompanyTypeSelected] = useState(initialCompaniesTypesOptions[0]);
  const [mentorSelected, setMentorSelected] = useState(initalMentorsOptions[0]);
  const [rangeSelected, setRangeSelected] = useState(initalRange);

  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState(null);

  const { token } = useContext(AuthContext);
  const { isMentor } = useContext(UserContext);

  const nav = useNavigate();

  const search = useCallback(async ({ companyType, mentor, date_init, date_end }) => {
    setLoading(true)
    try {
      const [applications, mentoringGroups] = await Promise.all([
        ApplicationService.searchApplications(token, { companyType, mentor, date_init, date_end }),
        UsersService.getMentoringGroups(token)
      ])
      const otherOptions = mentoringGroups.data.map((mentor) => {
        return { label: mentor.name, value: mentor.id };
      });
      setStats(applications.data);
      setMentorsOptions([...initalMentorsOptions, ...otherOptions]);
    } catch (err) {
      console.log(err)
      toast.error("Erro ao buscar dashboard");
    }
    setLoading(false)
  }, [token])

  useEffect(() => {
    if (!isMentor) nav("/student")
  }, [isMentor]);

  useEffect(() => {
    search({
      companyType: companyTypeSelected.value,
      mentor: mentorSelected.value,
      date_init: correct_date_filter(rangeSelected.from ? rangeSelected.from : rangeSelected.to),
      date_end: correct_date_filter(rangeSelected.to ? rangeSelected.to : rangeSelected.from)
    })
  }, [mentorSelected, rangeSelected, companyTypeSelected]);

  window.onresize = () => {
    setLoading(true)
    debounce(() => { setLoading(false) }, 500)
  }

  return (
    <Container>
      <FilterBar>

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
      {stats && !loading &&
        <>
          <Line style={{ gap: '3rem', flexWrap: "wrap" }}>
            {DoughnutCharts.map(({ title, attribute }) => (
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
          {LineCharts.map(({ title, attribute }) => (
            <Line>
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
      }
      {!(stats && !loading) &&
        <>
          <Line style={{ gap: '3rem', flexWrap: "wrap" }}>
            {DoughnutCharts.map(({ title, attribute }) => (
              <Skeleton
                key={`${title}-skeleton`}
                variant="rectangular"
                animation="wave"
                style={{ minWidth: 400, borderRadius: 5, flex: 1, height: 350 }} />
            ))}
          </Line>

          {LineCharts.map(({ title, attribute }) => (
            <Line key={`${title}-skeleton`}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                style={{ minWidth: 400, borderRadius: 5, flex: 1, height: 350 }} />
            </Line>
          ))}
        </>
      }
      {loading && "..."}
    </Container >
  );
}

export default Dashboard;
