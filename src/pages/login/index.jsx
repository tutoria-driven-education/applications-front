import LoginWithGoogle from "../../components/LoginWithGoogle";

import { AuthLabel, AuthWrapper, Container } from "./style";

export default function Login() {
  return (
    <Container>
      <AuthWrapper>
        <AuthLabel>Entrar</AuthLabel>
        <LoginWithGoogle />
      </AuthWrapper>
    </Container>
  );
}
