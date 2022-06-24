import { useEffect, useState } from "react";
import { Form } from "../../components/FormData";
import CompaniesService from "../../services/CompaniesService";
import { Container } from "./Student.style";

const StudentHomepage = () => {
  const [companies, setCompanies] = useState(undefined);

  useEffect(() => {
    const promise = CompaniesService.getCompanies();
    promise.then(({ data }) => setCompanies(data));
    promise.catch(({ response }) => console.error(response));
  }, []);

  return (
    <Container>
      <Form data={companies} title="Adicionar nova aplicação:" />
    </Container>
  );
};

export default StudentHomepage;
