import { useEffect, useState } from "react";
import Item from "../Item/Item";
import { ListContainer } from "./List.styles";

const List = ({
  array,
  updateApplication,
  isWaiting,
  setApplications,
  isMentorPage,
}) => {
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    setApplications([...array]);
  }, [flag]); //eslint-disable-line react-hooks/exhaustive-deps

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
          isMentorPage={isMentorPage}
        />
      ))}
    </ListContainer>
  );
};

export default List;
