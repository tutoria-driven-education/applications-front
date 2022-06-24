import { TextField } from "@mui/material";

const CustomInput = ({ value, setValue, label, placeholder }) => {
  return (
    <TextField
      value={value}
      required={true}
      type="url"
      onChange={(event) => setValue(event.target.value)}
      label={label}
      placeholder={placeholder || ""}
    />
  );
};

export default CustomInput;
