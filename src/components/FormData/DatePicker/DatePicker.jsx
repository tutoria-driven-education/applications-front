import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import brLocale from "dayjs/locale/pt-br";

const CustomDatePicker = ({ value, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={brLocale}>
      <DesktopDatePicker
        label="Data de aplicação"
        value={value}
        disableFuture
        inputFormat="DD/MM/YYYY"
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => <TextField type="date" required {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
