import { TextField } from "@mui/material";

const CustomInput = ({ label, helper }) => {
  return <TextField label={label} helperText={helper || ""} />;
};

export default CustomInput;
