import { Autocomplete, TextField } from "@mui/material";

const CustomAutocomplete = ({ data, label }) => {
  return (
    <Autocomplete
      options={data}
      blurOnSelect
      freeSolo={true}
      color="error"
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default CustomAutocomplete;
