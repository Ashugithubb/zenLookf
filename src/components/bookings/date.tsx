import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";

export interface DateRangeFilterProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onStartChange: (date: Dayjs | null) => void;
  onEndChange: (date: Dayjs | null) => void;
}

export default function DateRangeFilter({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}: DateRangeFilterProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" gap={2}>
        <DatePicker
          label="Start Date"
          value={startDate}
          disablePast
          onChange={(newValue) => onStartChange(newValue ?? null)}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
        />

        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => onEndChange(newValue ?? null)}
          minDate={startDate ?? undefined}
          disablePast
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
