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

const Item = ({ data }) => (
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
      </ItemSection>
      <ItemSection>
        <ItemSectionTitle>Finalização</ItemSectionTitle>
      </ItemSection>
    </MainContent>
  </ItemContainer>
);

export default Item;
