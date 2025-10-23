import * as React from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

export  interface SelectProps {
  value: dayjs.Dayjs | null;
  onChange: (val: dayjs.Dayjs | null) => void;
  label?: string;
}


export default function TimeSelector  ({ value, onChange, label = "Select Time" }:SelectProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        ampm={false}
         value={value && dayjs.isDayjs(value) ? value : null}  
        onChange={onChange}
        slotProps={{
          textField: {
            fullWidth: true,
            size: "small",
          },
        }}
      />
    </LocalizationProvider>
  );
}
