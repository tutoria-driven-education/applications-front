import {
  ItemTitle,
  ItemContainer,
  ItemHeader,
  ItemSection,
  ItemSectionTitle,
  MainContent,
} from "./Item.styles";
import { BsFillPersonLinesFill, BsFillCalendarEventFill } from "react-icons/bs";
import { RiBuilding2Fill } from "react-icons/ri";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa";
import dayjs from "dayjs";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

const Item = ({ data, updateApplication, isWaiting, setFlag, flag }) => {
  const { isMentor } = useContext(UserContext)
  return (
    <ItemContainer>
      {data.User.name && isMentor && (
        <ItemHeader>
          <BsFillPersonLinesFill size={20} />
          <ItemTitle>{data.User.name}</ItemTitle>
        </ItemHeader>
      )}
      <MainContent>
        <ItemSection>
          <ItemSectionTitle>Informações</ItemSectionTitle>
          <ul>
            <li>
              <RiBuilding2Fill color="black" size={18} />
              <span>Empresa: {data.Company.name}</span>
            </li>
            <li>
              <BsBriefcaseFill color="black" size={18} />{" "}
              <span>Vaga: {data.Job.name}</span>
            </li>
            <li>
              <FaLink color="black" size={18} />{" "}
              <span>
                Link: <a href={data.link}>{data.link}</a>
              </span>
            </li>
            <li>
              <BsFillCalendarEventFill color="black" size={18} />
              <span>
                Data de aplicação: {dayjs(data.date).format("DD/MM/YYYY")}{" "}
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
                  disabled={isWaiting}
                  onChange={(event) => {
                    data.profile = event.target.checked;
                    setFlag(!flag);
                    updateApplication(data.id);
                  }}
                />
              }
              label="Análise de currículo e perfil"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.technic}
                  disabled={isWaiting}
                  onChange={(event) => {
                    data.technic = event.target.checked;
                    setFlag(!flag);
                    updateApplication(data.id);
                  }}
                />
              }
              label="Etapa técnica"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.behavior}
                  disabled={isWaiting}
                  onChange={(event) => {
                    data.behavior = event.target.checked;
                    setFlag(!flag);
                    updateApplication(data.id);
                  }}
                />
              }
              label="Etapa comportamental"
              labelPlacement="end"
            />
          </FormGroup>
        </ItemSection>
        <ItemSection>
          <ItemSectionTitle>Finalização</ItemSectionTitle>
          <RadioGroup>
            <FormControlLabel
              value={1}
              checked={data?.Status?.id === 1}
              control={
                <Radio
                  onChange={(event) => {
                    data.Status = event.target.value;
                    setFlag(!flag);
                    updateApplication(data.id);
                  }}
                  disabled={isWaiting}
                />
              }
              label="Passei"
            />
            <FormControlLabel
              value={2}
              checked={data?.Status?.id === 2}
              control={
                <Radio
                  disabled={isWaiting}
                  onChange={(event) => {
                    data.Status = event.target.value;
                    setFlag(!flag);
                    updateApplication(data.id);
                  }}
                />
              }
              label="Não rolou"
            />
            <FormControlLabel
              value={3}
              checked={data?.Status?.id === 3}
              control={
                <Radio
                  disabled={isWaiting}
                  onChange={(event) => {
                    data.Status = event.target.value;
                    setFlag(!flag);
                    updateApplication(data.id);
                  }}
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
