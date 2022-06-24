import { useEffect, useState } from "react";
import Item from "../Item/Item";
import { ListContainer } from "./List.styles";

const List = ({ array, updateApplication, isWaiting, setApplications }) => {
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    setApplications([...array]);
  }, [flag]);

  return (
    <ListContainer>
      {array.map((elem) => (
        <Item
          key={elem.id}
          isWaiting={isWaiting}
          updateApplication={updateApplication}
          setFlag={setFlag}
          flag={flag}
          data={elem}
        />
      ))}
    </ListContainer>
  );
};

export default List;
