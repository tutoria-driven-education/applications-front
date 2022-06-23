import styled from "styled-components"
import Header from "../../components/Header";
function Login() {
    return <PageBody>
        <Header />

        <Box>
            <input placeholder="Senha de acesso"/>
            <button>Entrar</button>
        </Box>

    </PageBody>;
  }
  
export default Login;

const PageBody = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #000;
`;

const Box = styled.div`
    width: 300px;
    height: 250px;
    background-color: #525268;
    margin:0 auto;
    margin-top:150px;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius:15px ;

    input {
        width:250px;
        height:35px;
        font-size:20px;
        border: none;
        border-radius: 5px;
        ::placeholder{
            font-family: 'Roboto Condensed', sans-serif;
            font-size:20px;
        }
    }

    button{
        border:none;
        width:230px;
        height: 40px;
        font-size: 24px;
        font-weight:bold;
        cursor: pointer;
        color:whitesmoke;
        background-color:#FF7BBD;
        border-radius: 15px;
    }

`;
