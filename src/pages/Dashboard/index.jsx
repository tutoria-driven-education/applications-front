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
  TableContent,
  TableItem,
  ContainerSelect
} from "./styles";

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

  const [infoDisplay, setInfoDisplay] = useState({});

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
        <TableContent>
          <TableItem> Total de aplicações </TableItem>
          <TableItem> {infoDisplay.total} </TableItem>

          <TableItem> Analise de currículo </TableItem>
          <TableItem> {infoDisplay.analyticCurriculum} </TableItem>

          <TableItem> Etapa Comportamental </TableItem>
          <TableItem> {infoDisplay.stageBehavioral} </TableItem>

          <TableItem> Teste técnico </TableItem>
          <TableItem> {infoDisplay.stageTechnic} </TableItem>

          <TableItem> Receberam propostas </TableItem>
          <TableItem> {infoDisplay.approved} </TableItem>

          <TableItem> Não rolou </TableItem>
          <TableItem> {infoDisplay.notMatch} </TableItem>

          <TableItem> Desistiram </TableItem>
          <TableItem> {infoDisplay.giveUp} </TableItem>
        </TableContent>
      </Content>
    </Container>
  );
}

export default Dashboard;
