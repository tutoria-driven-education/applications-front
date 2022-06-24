import Item from "../Item/Item";
import { ListContainer } from "./List.styles";

const List = ({ array }) => (
  <ListContainer>
    {array.map((elem) => (
      <Item key={elem.id} data={elem} />
    ))}
  </ListContainer>
);

export default List;
