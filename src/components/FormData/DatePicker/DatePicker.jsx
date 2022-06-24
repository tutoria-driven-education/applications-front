import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import brLocale from "dayjs/locale/pt-br";
import { useState } from "react";

const CustomDatePicker = () => {
  const [date, setDate] = useState(dayjs());
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={brLocale}>
      <DatePicker
        value={date}
        disableFuture
        onChange={(newValue) => setDate(dayjs(newValue))}
        label="Data de aplicação"
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
