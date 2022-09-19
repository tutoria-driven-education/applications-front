import { Container, MentorNameHolder } from "./style";
import copyText from "../../../utils/copyText";
import { toast } from "react-toastify";

export default function Mentor({ name, email }) {
  const getEmail = () => {
    if (!email) {
      toast.info(
        "Este(a) mentor(a) não possui e-mail cadastrado, então o nome dele(a) será copiado!"
      );
      copyText(name, "o nome");
      return;
    }

    copyText(email, "o e-mail");
  };

  return (
    <Container onClick={() => getEmail()}>
      <MentorNameHolder>{name}</MentorNameHolder>
      <MentorNameHolder>{email ?? "-"}</MentorNameHolder>
    </Container>
  );
}
