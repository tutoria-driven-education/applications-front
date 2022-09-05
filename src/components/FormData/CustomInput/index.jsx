import { TextField } from "@mui/material";

const CustomInput = ({
  value,
  setValue,
  label,
  placeholder,
  type = "text",
  multiline = false,
  required = true,
}) => {
  return (
    <TextField
      value={value}
      required={required}
      type={type}
      onChange={(event) => setValue(event.target.value)}
      label={label}
      multiline={multiline}
      placeholder={placeholder || ""}
    />
  );
};

export default CustomInput;
