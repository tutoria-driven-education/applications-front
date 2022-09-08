import LoginWithGoogle from "../../components/LoginWithGoogle";

import { AuthLabel, AuthWrapper, Container } from "./style";

export default function Login() {
  return (

    <Container>
      <AuthWrapper>
        <AuthLabel>Entrar</AuthLabel>
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
        <LoginWithGoogle />
      </AuthWrapper>
    </Container>
  );
}
