import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Applications from "../../../services/ApplicationsService";
import fomatData from "../../../utils/fomatData";
import Item from "../Item";
import { ListContainer } from "./styles";

const List = ({
  array,
  updateApplication,
  isWaiting,
  setApplications,
  isMentorPage,
  token,
}) => {
  const [flag, setFlag] = useState(true);

  const getAllApplications = () => {
    Applications.getAllApplications(token)
      .then(({ data }) => {
        setApplications(fomatData(data));
      })
      .catch(({ response }) => {
        console.error(response.data);
        toast.error(response.data);
      });
  };

  useEffect(() => {
    getAllApplications();
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
          updateApplications={() => {
            getAllApplications();
          }}
        />
      ))}
    </ListContainer>
  );
};

export default List;
