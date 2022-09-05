import { CommentsText, ItemSection, ItemSectionTitle } from "../styles";
import { RiBuilding2Fill } from "react-icons/ri";
import {
  BsBoxArrowUpRight,
  BsBriefcaseFill,
  BsFillCalendarEventFill,
} from "react-icons/bs";
import { FaComments, FaLink } from "react-icons/fa";
import dayjs from "dayjs";

const ItemInfo = (props) => {
  const iconPref = {
    color: "black",
    size: 18,
  };

  const emptyTagsForNullablesFields = () => {
    const nullableTags = ["link", "notes"];
    const emptyTags = [];

    nullableTags.forEach((tag) => {
      if (props[tag] === null) {
        emptyTags.push(tag);
      }
    });

    return emptyTags;
  };

  return (
    <ItemSection>
      {props.isNotInModal && (
        <ItemSectionTitle onClick={props.openModal}>
          Informações
        </ItemSectionTitle>
      )}
      <ul>
        <li>
          <RiBuilding2Fill color={iconPref.color} size={iconPref.size} />
          <span>Empresa: {props.company}</span>
        </li>
        <li>
          <BsBriefcaseFill color={iconPref.color} size={iconPref.size} />
          <span>Vaga: {props.job}</span>
        </li>
        {props.link && (
          <li>
            <FaLink color={iconPref.color} size={iconPref.size} />
            <span>
              Link:
              <a target={"_blank"} rel="noreferrer" href={props.link}>
                {` ${props.link}`}
                <BsBoxArrowUpRight />
              </a>
            </span>
          </li>
        )}
        <li>
          <BsFillCalendarEventFill
            color={iconPref.color}
            size={iconPref.size}
          />
          <span>
            Data de aplicação: {dayjs(props.date).format("DD/MM/YYYY")}
          </span>
        </li>
        {props.notes && (
          <li>
            <FaComments
              color={iconPref.color}
              size={iconPref.size}
              style={{ minWidth: iconPref.size }}
            />
            <span>
              Comentários:{" "}
              <CommentsText isNotInModal={props.isNotInModal}>
                {" "}
                {props.notes}
              </CommentsText>{" "}
            </span>
          </li>
        )}
        {props.isNotInModal &&
          emptyTagsForNullablesFields().map((tag) => <li key={tag} />)}
      </ul>
    </ItemSection>
  );
};

export default ItemInfo;
