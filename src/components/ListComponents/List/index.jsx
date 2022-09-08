import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Applications from "../../../services/ApplicationsService";
import fomatData from "../../../utils/fomatData";
import Item from "../Item";
import { ListContainer, Filter } from "./styles";

const List = ({
  array,
  updateApplication,
  isWaiting,
  setApplications,
  isMentorPage,
  token,
}) => {
  const [flag, setFlag] = useState(true);
  //const [filteredApplications, setFilteredApplications] = useState(array) 
  const [company,setCompany] = useState("")
  const [job,setJob] = useState("Todos")

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
      <Filter>
        <input onChange={(e)=> setCompany(e.target.value)}></input>
        <select onChange={(e)=> setJob(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Desenvolvedor FullStack">Desenvolvedor FullStack</option>
          <option value="Desenvolvedor Back-End">Desenvolvedor Back-End</option>
          <option value="Desenvolvedor Front-End">Desenvolvedor Front-End</option>
          <option value="Engenheiro de Software">Engenheiro de Software</option>
          <option value="Outros">Outros</option>
        </select>
      </Filter>
      {array.filter((app)=>(job==="Todos"?true:app.job===job) && app.company.includes(company)).map((elem) => (
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
