import styled from "styled-components"
function Header() {
    return <Wrapper>
        Applications
    </Wrapper>;
  }
  
export default Header;

const Wrapper = styled.div`
    width: 100%;
    height: 100px;
    background-color: #FF7BBD;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: bold;
`;