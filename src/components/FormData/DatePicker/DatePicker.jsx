import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import brLocale from "dayjs/locale/pt-br";

const CustomDatePicker = ({ value, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={brLocale}>
      <DatePicker
        value={value}
        disableFuture
        inputFormat="DD/MM/YYYY"
        onChange={(newValue) => {
          console.log(newValue);
          setValue(newValue);
        }}
        label="Data de aplicação"
        renderInput={(params) => (
          <TextField
            type="datetime-local"
            required
            {...params}
            placeholder="dd/mm/aaaa"
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
