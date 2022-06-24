import { Form } from "../../components/FormData";
import { Container } from "./Student.style";

const StudentHomepage = () => {
  const companies = ["Google", "Amazon", "Apple", "NuBank", "Driven"];
  return (
    <Container>
      <Form data={companies} title="Adicionar nova aplicação:" />
    </Container>
  );
};

export default StudentHomepage;
