import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Applications from "../../../services/ApplicationsService";
import dataFormatter from "../../../utils/dataFormatter";
import Item from "../Item/Item";
import { ListContainer } from "./List.styles";

const List = ({
  array,
  updateApplication,
  isWaiting,
  setApplications,
  isMentorPage,
  token,
}) => {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    Applications.getAllApplications(token)
      .then(({ data }) => {
        setApplications(dataFormatter(data));
      })
      .catch(({ response }) => {
        console.error(response.data);
        toast.error(response.data);
      });
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
