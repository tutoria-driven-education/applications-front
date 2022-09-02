import { TextField } from "@mui/material";

const CustomInput = ({ value, setValue, label, placeholder, required = true }) => {
  return (
    <TextField
      value={value}
      required={required}
      type="url"
      onChange={(event) => setValue(event.target.value)}
      label={label}
      placeholder={placeholder || ""}
    />
  );
};

export default CustomInput;
