import { Autocomplete, TextField } from "@mui/material";

const CustomAutocomplete = ({ value, setValue, free, data, label }) => {
  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.name || value}
      inputValue={value}
      onInputChange={(_, newValue) => setValue(newValue)}
      blurOnSelect
      freeSolo={!!free}
      color="primary"
      renderInput={(params) => (
        <TextField type="text" required {...params} label={label} />
      )}
    />
  );
};

export default CustomAutocomplete;
