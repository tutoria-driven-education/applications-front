import { Autocomplete, TextField } from "@mui/material";

const CustomAutocomplete = ({ data, label }) => {
  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.name}
      blurOnSelect
      freeSolo={true}
      color="error"
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default CustomAutocomplete;
