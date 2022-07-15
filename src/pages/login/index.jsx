import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import AuthContext from "../../contexts/AuthContext";
import UserContext from "../../contexts/UserContext";
import AuthService from "../../services/AuthServices";
import { Box, PageBody } from "./style";

export default function Login() {
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { setToken } = useContext(AuthContext);
  const { setIsMentor } = useContext(UserContext);
  const navigate = useNavigate();

  function submitInput(event) {
    event.preventDefault();

    AuthService.login(inputValue)
      .then(({ data }) => {
        setToken(data.token);
        setIsMentor(data.is_mentor);
        data.is_mentor ? navigate("/mentor") : navigate("/student");
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
