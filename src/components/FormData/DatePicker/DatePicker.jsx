import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import brLocale from "dayjs/locale/pt-br";

const CustomDatePicker = ({ value, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={brLocale}>
      <DesktopDatePicker
        value={value}
        inputFormat={"DD/MM/YYYY"}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        label="Data de aplicação"
        renderInput={(params) => <TextField type="date" required {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
