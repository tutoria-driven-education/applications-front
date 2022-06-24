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

const Item = ({ data, updateApplication, isWaiting, setFlag, flag }) => {
  return (
    <ItemContainer>
      {data.name && (
        <ItemHeader>
          <BsFillPersonLinesFill size={20} />
          <ItemTitle>{data.name}</ItemTitle>
        </ItemHeader>
      )}
      <MainContent>
        <ItemSection>
          <ItemSectionTitle>Informações</ItemSectionTitle>
          <ul>
            <li>
              <RiBuilding2Fill color="black" size={18} />
              <span>Empresa: {data.company}</span>
            </li>
            <li>
              <BsBriefcaseFill color="black" size={18} />{" "}
              <span>Vaga: {data.job}</span>
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
                    updateApplication(data.id, "profile", event.target.checked);
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
                    updateApplication(data.id, "technic", event.target.checked);
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
                    updateApplication(
                      data.id,
                      "behavior",
                      event.target.checked
                    );
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
              value="approved"
              control={
                <Radio
                  onChange={(event) => {
                    data.status = event.target.value;
                    setFlag(!flag);
                  }}
                  disabled={isWaiting}
                />
              }
              label="Passei"
            />
            <FormControlLabel
              value="notMatch"
              control={
                <Radio
                  disabled={isWaiting}
                  onChange={(event) => {
                    data.status = event.target.value;
                    setFlag(!flag);
                  }}
                />
              }
              label="Não rolou"
            />
            <FormControlLabel
              value="giveUp"
              control={
                <Radio
                  disabled={isWaiting}
                  onChange={(event) => {
                    data.status = event.target.value;
                    setFlag(!flag);
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
