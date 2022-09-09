import styled from "styled-components";

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const Filter = styled.section`
  display: flex;
  justify-content:flex-end;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  max-width: 50%;
  margin-left:50%;
  p{
    color:white;
    font-size: 16px;
  }
  .option{
    border-radius: 15px;
    padding-left: 10px;
    height: 30px;
    min-width:150px;
    display:flex;
    flex: 1;
    
  }
  .date{
    border-radius: 15px;
    padding-left: 10px;
    height: 30px;
    min-width:150px;
    display:flex;
    flex: 1;
  }
  /* @media (max-width: 875px) {
    flex-wrap: wrap;
    gap:2px;
  } */
  
`;

export { ListContainer, Filter };
