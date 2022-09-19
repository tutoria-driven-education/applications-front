import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button, TextField } from "@mui/material";

import { toast } from "react-toastify";

import AuthContext from "../../contexts/AuthContext";
import UserContext from "../../contexts/UserContext";
import AuthService from "../../services/AuthServices";

import { Container, AuthLabel, AuthWrapper, Box } from "./style";

import LoginWithGoogle from "../../components/LoginWithGoogle";

export default function Login() {
  const [isSignUpAction, setIsSignUpAction] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("m") && searchParams.get("c")) setIsSignUpAction(true);
  }, [searchParams]);

  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const { setToken } = useContext(AuthContext);
  const { setIsMentor } = useContext(UserContext);
  const { setName } = useContext(UserContext);

  const navigate = useNavigate();

  function submitInput(event) {
    event.preventDefault();

    AuthService.login(inputValue)
      .then(({ data }) => {
        setToken(data.token);
        setIsMentor(data.is_mentor);
        setName(data.name);
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

  function handleCallbackResponse(res) {
    AuthService.authWithGoogle({
      token: res.credential,
      ...(isSignUpAction && {
        mentor_id: searchParams.get("m"),
        class_id: searchParams.get("c"),
      }),
    })
      .then(({ data }) => {
        setToken(data.token);
        setIsMentor(data.is_mentor);
        setName(data.name);
        data.is_mentor ? navigate("/mentor") : navigate("/student");
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          toast.error("Link de cadastro inválido!");
        } else {
          toast.error(
            "Erro inesperado. Por favor, entre em contato com a coordenação!"
          );
        }
      });
  }

  return (
    <Container>
      <AuthWrapper>
        <AuthLabel>Entrar</AuthLabel>
        {isSignUpAction ? (
          <LoginWithGoogle callback={handleCallbackResponse} />
        ) : (
          <>
            <Box data-cy="login-box" onSubmit={submitInput}>
              <TextField
                label="Senha de acesso"
                variant="standard"
                value={inputValue}
                name="password"
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
            <LoginWithGoogle callback={handleCallbackResponse} />
          </>
        )}
      </AuthWrapper>
    </Container>
  );
}
