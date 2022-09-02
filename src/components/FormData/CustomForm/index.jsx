import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Applications from "../../../services/ApplicationsService";
import fomatData from "../../../utils/fomatData";
import { Autocomplete, DatePicker, Input, Button } from "../index";
import { Form, Row, FormTitle } from "./styles";

const CustomForm = ({ data, title, token, setApplications }) => {
  const [company, setCompany] = useState("");
  const [job, setJob] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState(null);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (company && job && link && date) setDisable(false);
    else !disable && setDisable(true);
  }, [company, job, link, date]); //eslint-disable-line react-hooks/exhaustive-deps

  function sendNewJobApplication(event) {
    event.preventDefault();

    if (!company || !job || !link || !date) {
      toast.warn("Por favor, preencha todos os campos corretamente!");
      return;
    }

    Applications.postNewApplication(
      {
        company,
        job,
        link,
        date,
      },
      token
    )
      .then(() => {
        toast.success("Aplicação salva com sucesso");
        Applications.getAllApplications(token).then(({ data }) => {
          setApplications(fomatData(data));
          setCompany("");
          setJob("");
          setLink("");
          setDate(null);
        });
      })
      .catch(({ response }) => toast.error(response?.message));
  }

  return (
    <Form onSubmit={sendNewJobApplication}>
      <FormTitle>{title}</FormTitle>
      {data && (
        <>
          <Row>
            <Autocomplete
              value={company}
              setValue={setCompany}
              data={data.companies}
              label="Empresa"
              free={true}
            />
            <Autocomplete
              value={job}
              setValue={setJob}
              data={data.jobs}
              label="Vaga"
            />
          </Row>
          <Row>
            <Input
              value={link}
              setValue={setLink}
              label="Link"
              placeholder="https://..."
            />
            <DatePicker value={date} setValue={setDate} />
          </Row>
          <Button disable={disable}>Enviar</Button>
        </>
      )}
    </Form>
  );
};

export default CustomForm;
