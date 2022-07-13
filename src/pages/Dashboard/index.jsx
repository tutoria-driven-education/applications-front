import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import {
  Container,
  Content,
  FilterBar,
  TableContent,
  TableItem,
} from "./styles";
import AuthContext from '../../contexts/AuthContext'
import ApplicationService from '../../services/ApplicationsService'

function Dashboard() {
  /**
   * @type {Array<import("../../../@types").ApplicationResponse>}
   */
  const [applications, setApplications] = useState({});
  const [mentorsOptions, setMentorsOptions] = useState([
    {
      label: "Todos mentores",
      value: "all",
    },
  ]);
  /**
   * @type {Array<import("../../../@types").Amounts>}
   */
  const [infoDisplay, setInfoDisplay] = useState({});
  const [valueRangeDisplay, setValueRangeDisplay] = useState({
    label: "Total de aplicações",
    value: "all",
  });
  const [valueMentorDisplay, setValueMentorDisplay] = useState({
    label: "Todos mentores",
    value: "all",
  });
  const {token} = useContext(AuthContext)

  const optionsRange = [
    { label: "Total de aplicações", value: "all" },
    { label: "Aplicações em parceiras", value: "inPartner" },
    { label: "Aplicações em outras", value: "inOther" },
  ];

  useEffect(() => {
    ApplicationService.getDashboard(token).then((response) => {
      const otherOptions = response.data.mentors.map((mentor) => {
        return {
          label: mentor.name,
          value: mentor.name,
        };
      });

      setInfoDisplay(response.data.allApplications.amounts);
      setApplications(response.data);
      setMentorsOptions([...mentorsOptions, ...otherOptions]);
    });
  }, []); //eslint-disable-line  react-hooks/exhaustive-deps

  function handleSelectRange(event) {
    setValueMentorDisplay(mentorsOptions[0]);
    setValueRangeDisplay(event);
    switch (event.value) {
      case "all":
        setInfoDisplay(applications.allApplications.amounts);
        break;
      case "inPartner":
        setInfoDisplay(applications.applicationsInCompanyPartner.amounts);
        break;
      case "inOther":
        setInfoDisplay(applications.applicationsInOtherCompany.amounts);
        break;
      default:
        alert("Recarregue a pagina!");
        break;
    }
  }
  function handleSelectMentor(event) {
    setValueMentorDisplay(event);
    if (event.value === "all") {
      handleSelectRange(optionsRange[0]);
    }
    const mentorInfo = applications.mentors.find(
      (mentor) => mentor.name === event.value
    );
    if (!mentorInfo) {
      return;
    }
    setValueRangeDisplay({
      label: "Total de aplicações",
      value: "all",
    });
    setInfoDisplay(mentorInfo.amounts);
  }

  if (Object.keys(applications).length === 0) {
    return "Loading...";
  }

  return (
    <Container>
      <Content>
        <FilterBar>
          <Select
            value={valueRangeDisplay}
            onChange={handleSelectRange}
            options={optionsRange}
            defaultValue={optionsRange[0]}
          />
          <Select
            value={valueMentorDisplay}
            onChange={handleSelectMentor}
            options={mentorsOptions}
            defaultValue={mentorsOptions[0]}
          />
        </FilterBar>
        <TableContent>
          <TableItem> Total de aplicações </TableItem>
          <TableItem> {infoDisplay.total} </TableItem>

          <TableItem> Analise de currículo </TableItem>
          <TableItem> {infoDisplay.analyticCurriculum} </TableItem>

          <TableItem> Etapa Comportamental </TableItem>
          <TableItem> {infoDisplay.stageBehavioral} </TableItem>

          <TableItem> Receberam propostas </TableItem>
          <TableItem> {infoDisplay.match} </TableItem>

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
