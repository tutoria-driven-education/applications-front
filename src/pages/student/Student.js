import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Section } from "../../components";
import { Form } from "../../components/FormData";
import { Item, List } from "../../components/ListComponents";
import CompaniesService from "../../services/CompaniesService";
import { Container } from "./Student.style";

const StudentHomepage = () => {
  const [companies, setCompanies] = useState(undefined);

  useEffect(() => {
    const promise = CompaniesService.getCompanies();
    promise.then(({ data }) => setCompanies(data));
    promise.catch(({ response }) => console.error(response));
  }, []);
  const mock = [
    {
      id: 1,
      company: "Google",
      job: "Dev Front",
      link: "https://www.figma.com/file/JSN1dHIkIXci0f8B8qsfXm/applications?node-id=0%3A1",
      data: dayjs(),
      profile: false,
      technic: false,
      behavior: true,
      status: "not match",
    },
    {
      id: 2,
      name: "John Doe",
      company: "Google",
      job: "Dev Back",
      link: "https://www.figma.com/file/JSN1dHIkIXci0f8B8qsfXm/applications?node-id=0%3A1",
      data: dayjs().diff(-2),
      profile: true,
      technic: true,
      behavior: false,
      status: "not match",
    },
  ];
  return (
    <Container>
      <Form data={companies} title="Adicionar nova aplicação:" />
      <Section title="Aplicações">
        <List array={mock} />
      </Section>
    </Container>
  );
};

export default StudentHomepage;
