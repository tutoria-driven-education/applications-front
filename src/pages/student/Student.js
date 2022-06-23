import { Autocomplete } from "../../components/Form";

import Section from "../../components/Section/Section";
import { Container } from "./Student.style";

const StudentHomepage = () => {
  const companies = ["Google", "Amazon", "Apple", "NuBank", "Driven"];
  return (
    <Container>
      <Section title="Adicionar nova aplicação:">
        <Autocomplete data={companies || []} />
      </Section>
    </Container>
  );
};

export default StudentHomepage;
