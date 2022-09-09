import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Applications from "../../../services/ApplicationsService";
import fomatData from "../../../utils/fomatData";
import { RangePicker } from "../../FormData/RangePicker";
import Item from "../Item";
import { ListContainer, Filter } from "./styles";

const correct_date_filter = (date) => {
  const day = date.day
  const month = date.month
  const year = date.year
  return new Date(year,month-1,day)
}

const getFirstDayOfTheMonth = () => {
    const date = new Date();
    const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
    return {
      day: newDate.getDate(),
      month: newDate.getMonth() + 1,
      year: newDate.getFullYear()
    }
  }

  const getAtualDate = () => {
    const date = new Date();
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    }
  }

  const initalRange = { from: null, to: null }

const List = ({
  array,
  updateApplication,
  isWaiting,
  setApplications,
  isMentorPage,
  token,
}) => {
  const [flag, setFlag] = useState(true);
  const [company,setCompany] = useState("")
  const [job,setJob] = useState("Todos")
  const [rangeSelected, setRangeSelected] = useState(initalRange);

  console.log(rangeSelected)
  console.log(rangeSelected.from===null? null:correct_date_filter(rangeSelected.from))
  console.log(array)
  console.log(rangeSelected.to===null? null:correct_date_filter(rangeSelected.to))
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
  

  function filterApplications(array){
    return array.filter((app)=>{
      return ((job==="Todos"?true:app.job===job) 
      && app.company.includes(company) && 
      (!rangeSelected.from?true:new Date(app.date)>=correct_date_filter(rangeSelected.from)) 
      && (!rangeSelected.to?true:new Date(app.date)<=correct_date_filter(rangeSelected.to)))
    })
  }


  return (
    <ListContainer>
      <Filter>
        <p>Filtrar:</p>
        <input className="option" placeholder="Empresa" onChange={(e)=> setCompany(e.target.value)}></input>
        <select className="option" onChange={(e)=> setJob(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Desenvolvedor FullStack">Desenvolvedor FullStack</option>
          <option value="Desenvolvedor Back-End">Desenvolvedor Back-End</option>
          <option value="Desenvolvedor Front-End">Desenvolvedor Front-End</option>
          <option value="Engenheiro de Software">Engenheiro de Software</option>
          <option value="Outros">Outros</option>
        </select>
        <RangePicker
            className="date"
            onChange={(newRange) => setRangeSelected({ ...newRange })}
            initialRange={initalRange}
          />
      </Filter>
      {filterApplications(array).map((elem) => (
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
