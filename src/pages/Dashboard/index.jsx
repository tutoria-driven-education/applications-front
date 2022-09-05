import Select from "react-select";
import UserContext from "../../contexts/UserContext";
import AuthContext from "../../contexts/AuthContext";
import UsersService from "../../services/UsersServices";
import ApplicationService from "../../services/ApplicationsService";
import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RangePicker } from "../../components/FormData/RangePicker";
import {
  Container,
  Content,
  FilterBar,
  Column,
  Line,
  ContainerSelect
} from "./styles";
import { DashboardCard } from "./DashboardCard";
import { ChartDoughnut } from './../../components/Charts/Doughnut/index'
import { BsArrowRight } from "react-icons/bs";
import { ChartLine } from "../../components/Charts/Line";

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

const initalRange = [getFirstDayOfTheMonth().toISOString(), new Date().toISOString()]

function Dashboard() {
  const initValueDates = initalRange;
  const initalMentorsOptions = [{ label: "Todos mentores", value: "all" }];
  const optionsRange = [
    { label: "Todas aplicações", value: "all" },
    { label: "Aplicações em parceiras", value: "inPartner" },
    { label: "Aplicações em outras", value: "inOther" },
  ];
  const [mentorsOptions, setMentorsOptions] = useState(initalMentorsOptions);

  const [valueRangeDisplay, setValueRangeDisplay] = useState(optionsRange[0]);
  const [valueMentorDisplay, setValueMentorDisplay] = useState(initalMentorsOptions[0]);
  const [valuePeriod, setValuePeriod] = useState(initValueDates);

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
  }, [])

  useEffect(() => {
    if (!isMentor) nav("/student")
  }, []);

  useEffect(() => {
    search({
      range: valueRangeDisplay.value,
      mentor: valueMentorDisplay.value,
      date_init: normalizeDate(valuePeriod[0], 'init'),
      date_end: normalizeDate(valuePeriod[1], 'end')
    })
  }, [valueRangeDisplay, valueMentorDisplay, valuePeriod]);

  return (
    <Container>
      <Content>
        <FilterBar>
          <ContainerSelect>
            <Select
              value={valueRangeDisplay}
              onChange={setValueRangeDisplay}
              options={optionsRange}
              defaultValue={optionsRange[0]}
              styles={{
                option: (provided, state) => ({ ...provided, cursor: "pointer" }),
                control: (provided) => ({ ...provided, cursor: "pointer" }),
              }}
            />
          </ContainerSelect>
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
              initValue={initValueDates}
              onChangeValue={(dates) => setValuePeriod([...dates])}
            />
          </div>
        </FilterBar>
        {infoDisplay &&
          <>
            <Line style={{ gap: 30, flexWrap: "wrap" }}>
              <DashboardCard minWidth={300} title="Aplicações (Empresas Parceiras X Outras)" theme={'light'}>
                <Column style={{ padding: 20, gap: 20, background: '#FFF', flex: 1, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                  <ChartDoughnut
                    infos={infoDisplay.companies.total.values}
                    labels={infoDisplay.companies.total.names}
                    colors={infoDisplay.companies.total.colors}
                  />
                  <Line style={{ gap: 10, flexWrap: "wrap" }}>
                    {infoDisplay.companies.total.names.map((name, index) => (
                      <Line style={{ alignItems: "center", gap: 5 }}>
                        <div style={{ minHeight: 10, maxHeight: 10, minWidth: 10, maxWidth: 10, background: infoDisplay.companies.total.colors[index] }}></div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", fontSize: 12 }}>
                          <b>{name}</b>
                          <BsArrowRight color="#000" />
                          {infoDisplay.companies.total.values[index]}
                        </div>
                      </Line>
                    ))}
                  </Line>
                </Column>
              </DashboardCard>
              <DashboardCard minWidth={300} title="Aplicações por Vaga" theme={'light'}>
                <Column style={{ padding: 20, gap: 20, background: '#FFF', flex: 1, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                  <ChartDoughnut
                    infos={infoDisplay.jobs.total.values}
                    labels={infoDisplay.jobs.total.names}
                    colors={infoDisplay.jobs.total.colors}
                  />
                  <Line style={{ gap: 10, flexWrap: "wrap" }}>
                    {infoDisplay.jobs.total.names.map((name, index) => (
                      <Line style={{ alignItems: "center", gap: 5 }}>
                        <div style={{ minHeight: 10, maxHeight: 10, minWidth: 10, maxWidth: 10, background: infoDisplay.jobs.total.colors[index] }}></div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", fontSize: 12 }}>
                          <b>{name}</b>
                          <BsArrowRight color="#000" />
                          {infoDisplay.jobs.total.values[index]}
                        </div>
                      </Line>
                    ))}
                  </Line>
                </Column>
              </DashboardCard>
              <DashboardCard minWidth={300} title="Aplicações por Status" theme={'light'}>
                <Column style={{ padding: 20, gap: 20, background: '#FFF', flex: 1, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                  <ChartDoughnut
                    infos={infoDisplay.status.values}
                    labels={infoDisplay.status.names}
                    colors={infoDisplay.status.colors}
                  />
                  <Line style={{ gap: 10, flexWrap: "wrap" }}>
                    {infoDisplay.status.names.map((name, index) => (
                      <Line style={{ alignItems: "center", gap: 5 }}>
                        <div style={{ minHeight: 10, maxHeight: 10, minWidth: 10, maxWidth: 10, background: infoDisplay.status.colors[index] }}></div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", fontSize: 12 }}>
                          <b>{name}</b>
                          <BsArrowRight color="#000" />
                          {infoDisplay.status.values[index]}
                        </div>
                      </Line>
                    ))}
                  </Line>
                </Column>
              </DashboardCard>
            </Line>
            <DashboardCard minWidth={300} title="Aplicações ao longo do período" theme={'light'}>
              <Column style={{ padding: 20, gap: 20, background: '#FFF', flex: 1, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                <ChartLine
                  infos={[{ name: "Totais", values: infoDisplay.per_day }, ...infoDisplay.companies.per_days, ...infoDisplay.jobs.per_days]}
                  labels={infoDisplay.days}
                />
                <Line style={{ gap: 10, flexWrap: "wrap" }}>
                  {/* {infoDisplay.status.names.map((name, index) => (
                    <Line style={{ alignItems: "center", gap: 5 }}>
                      <div style={{ minHeight: 10, maxHeight: 10, minWidth: 10, maxWidth: 10, background: infoDisplay.status.colors[index] }}></div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", fontSize: 12 }}>
                        <b>{name}</b>
                        <BsArrowRight color="#000" />
                        {infoDisplay.status.values[index]}
                      </div>
                    </Line>
                  ))} */}
                </Line>
              </Column>
            </DashboardCard>
          </>
        }


      </Content>
    </Container>
  );
}

export default Dashboard;
