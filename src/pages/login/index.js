import { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../contexts/AuthContext";
import AuthService from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

function Login() {
  const [inputValue, setInputValue] = useState("");
  const [warning, setWarning] = useState(false);
  const { setToken } = useContext(AuthContext);
  const { setIsMentor } = useContext(UserContext);
  let navigate = useNavigate();

  function submitInput(event) {
    event.preventDefault();

    const accessToken = inputValue;

    if (accessToken.length < 30) {
      setWarning(true);
      return;
    }
    AuthService.login(accessToken).then(({ data }) => {
      console.log(data);
      setToken(data.token);
      setIsMentor(data.is_mentor);
      if (data.is_mentor) {
        navigate("/mentor");
      } else {
        navigate("/student");
      }
    });
  }

  return (
    <PageBody>
      <Box onSubmit={submitInput}>
        {warning && <p>A senha de acesso está incorreta ou inválida</p>}
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="Senha de acesso"
        />
        <button type="submit">Entrar</button>
      </Box>
    </PageBody>
  );
}

export default Login;

const PageBody = styled.div`
  width: 100%;
  height: 93vh;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.form`
  width: 350px;
  height: 250px;
  background-color: #525268;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;

  input {
    width: 300px;
    height: 35px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    ::placeholder {
      font-family: "Roboto Condensed", sans-serif;
      font-size: 20px;
    }
  }

  button {
    border: none;
    width: 230px;
    height: 40px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: whitesmoke;
    background-color: #ff7bbd;
    border-radius: 15px;

    :hover {
      background-color: #ff8bcd;
    }
  }

  p {
    color: red;
  }
`;
