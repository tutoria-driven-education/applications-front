import { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../contexts/AuthContext";
import AuthService from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

export default function Login() {
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { setToken } = useContext(AuthContext);
  const { setIsMentor } = useContext(UserContext);
  let navigate = useNavigate();

  function submitInput(event) {
    event.preventDefault();

    AuthService.login(inputValue)
      .then(({ data }) => {
        setToken(data.token);
        setIsMentor(data.is_mentor);
        if (data.is_mentor) {
          navigate("/mentor");
        } else {
          navigate("/student");
        }
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          toast.error("Senha não encontrada!");
        } else {
          toast.error(
            "Erro inesperado. Por favor, entre em contato com a coordenação!"
          );
        }
        console.error(response);
      });
  }

  return (
    <PageBody>
      <Box onSubmit={submitInput}>
        <TextField
          label="Senha de acesso"
          variant="standard"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (e.target.value.length === 36) setIsDisabled(false);
            else !isDisabled && setIsDisabled(true);
          }}
          placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
          inputProps={{ style: { textAlign: "center" } }}
          sx={{ width: "80%" }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ fontWeight: 700, width: "30%" }}
          disabled={isDisabled}
        >
          Entrar
        </Button>
      </Box>
    </PageBody>
  );
}

const PageBody = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.form`
  width: 50%;
  min-width: 55rem;
  height: 250px;
  background-color: var(--darker);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 1.5rem;
`;
