import { useContext, useState } from "react";
import styled from "styled-components"
import Header from "../../components/Header";
import AuthContext from "../../contexts/AuthContext";
import AuthService from "../../services/AuthServices";
import {useNavigate} from "react-router-dom"


function Login() {
    const [inputValue, setInputValue] = useState("");
    const [warning, setWarning] = useState(false);
    const {setToken} = useContext(AuthContext);
    let navigate = useNavigate();

    function submitInput(event){
        event.preventDefault();

        const accessToken = inputValue;

        if(accessToken.length < 30){
            setWarning(true);
            return
        }
        AuthService.login(accessToken).then(({data})=>{
            console.log(data)
            
            
            setToken(data.token)
            navigate("test")
        });
    } 

    return <PageBody>
        <Header />
        <Box onSubmit={submitInput}>
            {warning && <p>A senha de acesso está incorreta ou inválida</p>}
            <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder="Senha de acesso"/>
            <button type="submit">Entrar</button>
        </Box>
    </PageBody>;
  }

export default Login;

const PageBody = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #000;
`;

const Box = styled.form`
    width: 350px;
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
        width:300px;
        height:35px;
        font-size:14px;
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

        :hover{
            background-color:#FF8BCD; ;
        }
    }

    p {
        color: red;
    }
`;
