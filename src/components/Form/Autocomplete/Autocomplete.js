import { Autocomplete, TextField } from "@mui/material";

const CustomAutocomplete = ({ data }) => {
  const companies = data || [];
  return (
    <Autocomplete
      options={companies}
      blurOnSelect
      freeSolo={true}
      color="error"
      renderInput={(params) => <TextField {...params} label="Empresa" />}
    />
  );
};

export default CustomAutocomplete;
