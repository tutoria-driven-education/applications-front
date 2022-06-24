import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader, Section } from "../../components";
import { Form } from "../../components/FormData";
import { List } from "../../components/ListComponents";
import Applications from "../../services/ApplicationsService";
import CompaniesService from "../../services/CompaniesService";
import { Container } from "./Student.style";

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
    status: "notMatch",
  },
  {
    id: 2,
    name: "Jennifer Doe",
    company: "Amazon",
    job: "Dev Back",
    link: "https://www.figma.com/file/JSN1dHIkIXci0f8B8qsfXm/applications?node-id=0%3A1",
    data: dayjs().diff(-2),
    profile: true,
    technic: true,
    behavior: false,
    status: null,
  },
];
const StudentHomepage = () => {
  const [companies, setCompanies] = useState(undefined);
  const [applications, setApplications] = useState(undefined);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const promise = CompaniesService.getCompanies();
    promise.then(({ data }) => setCompanies(data));
    promise.catch(({ response }) => console.error(response));

    Applications.getAllApplications()
      .then(({ data }) => {
        setApplications(data);
      })
      .catch(({ response }) => {
        setApplications(mock);
        console.error(response.data);
        toast.error(response.data);
      });
  }, []);

  function updateApplication(id) {
    const alteredApplication = applications.find((app) => app.id === id);

    setIsWaiting(true);

    Applications.updateApplicationField(id, alteredApplication)
      .catch(({ response }) => {
        console.error(response.data);
        toast.error(response.data);
      })
      .finally(() => setIsWaiting(false));
  }

  return (
    <Container>
      <Form data={companies} title="Adicionar nova aplicação:" />
      <Section title="Aplicações">
        {!applications ? (
          <Loader />
        ) : (
          <List
            array={applications}
            isWaiting={isWaiting}
            setApplications={setApplications}
            updateApplication={updateApplication}
          />
        )}
      </Section>
    </Container>
  );
};

export default StudentHomepage;
