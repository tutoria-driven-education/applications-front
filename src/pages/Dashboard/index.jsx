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
import { Container, FilterBar, Line, ContainerSelect } from "./styles";

const normalizeDate = (date, type) => {
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month = newDate.getMonth()
  const year = newDate.getFullYear()

  if (type === 'init') return new Date(year, month, day).toISOString()
  else return new Date(year, month, day + 1).toISOString()
}

const getFirstDayOfTheMonth = () => {
  const date = new Date();
  const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
  return newDate
}

const initalPeriod = [getFirstDayOfTheMonth().toISOString(), new Date().toISOString()]

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

  const [mentorsOptions, setMentorsOptions] = useState(initalMentorsOptions);

  const [valueMentorDisplay, setValueMentorDisplay] = useState(initalMentorsOptions[0]);
  const [valuePeriod, setValuePeriod] = useState(initalPeriod);

  const [infoDisplay, setInfoDisplay] = useState(null);

  const { token } = useContext(AuthContext);
  const { isMentor } = useContext(UserContext);

  const nav = useNavigate();

  const search = useCallback(async ({ range, mentor, date_init, date_end }) => {
    const [applications, mentoringGroups] = await Promise.all([
      ApplicationService.searchApplications(token, { range, mentor, date_init, date_end }),
      UsersService.getMentoringGroups(token)
    ])
    const otherOptions = mentoringGroups.data.map((mentor) => {
      return { label: mentor.name, value: mentor.id };
    });
    setInfoDisplay(applications.data);
    setMentorsOptions([...initalMentorsOptions, ...otherOptions]);
  }, [token])

  useEffect(() => {
    if (!isMentor) nav("/student")
  }, [isMentor]);

  useEffect(() => {
    search({
      mentor: valueMentorDisplay.value,
      date_init: normalizeDate(valuePeriod[0], 'init'),
      date_end: normalizeDate(valuePeriod[1], 'end')
    })
  }, [valueMentorDisplay, valuePeriod]);

  return (
    <Container>
      <FilterBar>
        <ContainerSelect>
          <Select
            value={valueMentorDisplay}
            onChange={setValueMentorDisplay}
            options={mentorsOptions}
            defaultValue={mentorsOptions[0]}
            styles={{
              option: (provided, state) => ({ ...provided, cursor: "pointer" }),
              control: (provided) => ({ ...provided, cursor: "pointer" }),
            }}
          />
        </ContainerSelect>
        <div style={{ display: "flex", flex: 1, minWidth: 250 }}>
          <RangePicker
            initValue={initalPeriod}
            onChangeValue={(dates) => setValuePeriod([...dates])}
          />
        </div>
      </FilterBar>
      {infoDisplay &&
        <>
          <Line style={{ gap: '3rem', flexWrap: "wrap" }}>
            {DoughnutCharts.map(({ title, attribute }) => (
              <DashboardChartDoughnut
                title={title}
                infos={infoDisplay[attribute].total.values}
                labels={infoDisplay[attribute].total.names}
                colors={infoDisplay[attribute].total.colors}
                minWidth={400}
              />
            ))}
          </Line>
          {LineCharts.map(({ title, attribute }) => (
            <DashboardCharLine
              title={title}
              infos={infoDisplay[attribute].per_days}
              labels={infoDisplay.days}
              minWidth={300}
              minHeight={350}
            />
          ))}
        </>
      }
    </Container >
  );
}

export default Dashboard;
