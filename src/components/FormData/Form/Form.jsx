import applicationTypes from "../../../utils/applicationTypes";
import { Autocomplete, DatePicker, Input } from "../index";
import { Form, Row, FormTitle } from "./Form.styles";

const CustomForm = ({ data, title }) => {
  return (
    <Form>
      <FormTitle>{title}</FormTitle>
      <Row>
        <Autocomplete data={data || []} label="Empresa" />
        <Autocomplete data={applicationTypes} label="Vaga" />
      </Row>
      <Row>
        <Input label="Link" helper="https://..." />
        <DatePicker />
      </Row>
    </Form>
  );
};

export default CustomForm;
