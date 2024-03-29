import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader, Section } from "../../components";
import { Form } from "../../components/FormData";
import { List } from "../../components/ListComponents";
import AuthContext from "../../contexts/AuthContext";
import Applications from "../../services/ApplicationsService";
import CompaniesService from "../../services/CompaniesService";
import fomatData from "../../utils/fomatData";
import { Container, LoaderContainer, Message } from "./Student.style";

const StudentHomepage = () => {
  const [companies, setCompanies] = useState(undefined);
  const [applications, setApplications] = useState(undefined);
  const [isWaiting, setIsWaiting] = useState(false);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const promise = CompaniesService.getCompanies();
    promise.then(({ data }) => setCompanies(data));
    promise.catch(({ response }) => console.error(response));

    Applications.getAllApplications(context.token)
      .then(({ data }) => setApplications(fomatData(data)))
      .catch(({ response }) => {
        console.error(response.data);
        toast.error(response.data);
        navigate("/", { replace: true });
      });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  function updateApplication(id) {
    const alteredApplication = applications.find((app) => app.id === id);
    delete alteredApplication.name;
    setIsWaiting(true);

    Applications.updateApplicationField(alteredApplication, context.token)
      .catch(({ response }) => {
        console.error(response);
        toast.error(response);
      })
      .finally(() => setIsWaiting(false));
  }

  return (
    <Container>
      <Form
        data={companies}
        title="Formulário de aplicação"
        token={context.token}
        setApplications={setApplications}
      />
      {applications === undefined ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Section title="Aplicações">
          {applications.length === 0 ? (
            <Message>
              Você ainda não aplicou para nenhuma vaga.
              <br /> Que tal aplicar hoje?
            </Message>
          ) : (
            <List
              array={applications}
              isWaiting={isWaiting}
              setApplications={setApplications}
              updateApplication={updateApplication}
              token={context.token}
            />
          )}
        </Section>
      )}
    </Container>
  );
};

export default StudentHomepage;
