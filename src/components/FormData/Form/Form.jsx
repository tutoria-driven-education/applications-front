import { Autocomplete, DatePicker, Input } from "../index";
import { Form, Row, FormTitle, CustomLoader } from "./Form.styles";

const CustomForm = ({ data, title }) => {
  return (
    <Form>
      <FormTitle>{title}</FormTitle>
      {!data ? (
        <CustomLoader />
      ) : (
        <>
          <Row>
            <Autocomplete data={data?.companies} label="Empresa" />
            <Autocomplete data={data?.jobs} label="Vaga" />
          </Row>
          <Row>
            <Input label="Link" helper="https://..." />
            <DatePicker />
          </Row>
        </>
      )}
    </Form>
  );
};

export default CustomForm;
