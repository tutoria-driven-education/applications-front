import {
  ItemContainer,
  ItemSection,
  ItemSectionTitle,
  MainContent,
} from "./Item.styles";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { RiBuilding2Fill } from "react-icons/ri";
import { BsBriefcaseFill, BsBoxArrowUpRight } from "react-icons/bs";

import { FaLink } from "react-icons/fa";
import dayjs from "dayjs";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import DeleteButton from "./deleteButton/DeleteButton";
import { useState } from "react";

const Item = ({
  data,
  updateApplication,
  isWaiting,
  setFlag,
  flag,
  isMentorPage,
  updateApplications,
}) => {
  const [radioValue, setRadioValue] = useState(String(data.status));

  function handleClick(event) {
    if (radioValue === event.target.value) {
      data.status = null;
      setRadioValue(null);
    } else {
      data.status = event.target.value;
      setRadioValue(data.status);
    }
    setFlag(!flag);
    updateApplication(data.id);
  }

  return (
    <ItemContainer>
      <DeleteButton
        CompanyName={data.company}
        applicationId={data.id}
        updateApplications={updateApplications}
      />
      <MainContent>
        <ItemSection>
          <ItemSectionTitle>Informações</ItemSectionTitle>
          <ul>
            <li>
              <RiBuilding2Fill color="black" size={18} />
              <span>Empresa: {data.company}</span>
            </li>
            <li>
              <BsBriefcaseFill color="black" size={18} />
              <span>Vaga: {data.job}</span>
            </li>
            <li>
              <FaLink color="black" size={18} />
              <span>
                Link:
                <a target={"_blank"} rel="noreferrer" href={data.link}>
                  {` ${data.link}`}
                  <BsBoxArrowUpRight />
                </a>
              </span>
            </li>
            <li>
              <BsFillCalendarEventFill color="black" size={18} />
              <span>
                Data de aplicação: {dayjs(data.date).format("DD/MM/YYYY")}
              </span>
            </li>
          </ul>
        </ItemSection>
        <ItemSection>
          <ItemSectionTitle>Etapas</ItemSectionTitle>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.profile}
                  disabled={isWaiting || isMentorPage}
                  onChange={(event) => {
                    data.profile = event.target.checked;
                    setFlag(!flag);
                    updateApplication(data.id);
                  }}
                  sx={{ minWidth: "50px" }}
                />
              }
              label="Análise de currículo e perfil"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.technic}
                  disabled={isWaiting || isMentorPage}
                  onChange={(event) => {
                    data.technic = event.target.checked;
                    setFlag(!flag);
                    updateApplication(data.id);
                  }}
                  sx={{ minWidth: "50px" }}
                />
              }
              label="Etapa técnica"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.behavior}
                  disabled={isWaiting || isMentorPage}
                  onChange={(event) => {
                    data.behavior = event.target.checked;
                    setFlag(!flag);
                    updateApplication(data.id);
                  }}
                  sx={{ minWidth: "50px" }}
                />
              }
              label="Etapa comportamental"
              labelPlacement="end"
            />
          </FormGroup>
        </ItemSection>
        <ItemSection>
          <ItemSectionTitle>Finalização</ItemSectionTitle>
          <RadioGroup value={radioValue}>
            <FormControlLabel
              value={1}
              // checked={!!data.status && Number(data.status) === 1}
              control={
                <Radio
                  onClick={handleClick}
                  disabled={isWaiting || isMentorPage}
                />
              }
              label="Passei"
            />
            <FormControlLabel
              value={2}
              // checked={!!data.status && Number(data.status) === 2}
              control={
                <Radio
                  disabled={isWaiting || isMentorPage}
                  onClick={handleClick}
                />
              }
              label="Não rolou"
            />
            <FormControlLabel
              value={3}
              // checked={!!data.status && Number(data.status) === 3}
              control={
                <Radio
                  disabled={isWaiting || isMentorPage}
                  onClick={handleClick}
                />
              }
              label="Desisti"
            />
          </RadioGroup>
        </ItemSection>
      </MainContent>
    </ItemContainer>
  );
};

export default Item;
