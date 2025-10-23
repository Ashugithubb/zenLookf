"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { createUnavailableSlotSchema } from "./schema/unavilable-slot.schema";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { createUnavailableSlot } from "@/app/redux/thunk/slots/unavailable.slot.thunk";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { toast } from "react-toastify";


type FormData = z.infer<typeof createUnavailableSlotSchema>;

export default function AddUnavailableSlotDialog() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createUnavailableSlotSchema),
  });

  const selectedDate = watch("date");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async (data: FormData) => {
    const res = await dispatch(createUnavailableSlot(data));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success("Unavilable Slot added Successfully!");
    } else {
      toast.error(res.payload || "failed to add slot");
    }
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button variant="contained" onClick={handleOpen}>
        Add Unavailable Slot
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Unavailable Slot</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>

          <DatePicker
            label="Select Date"
            value={selectedDate ? dayjs(selectedDate) : null}
            onChange={(newDate: Dayjs | null) => setValue("date", newDate?.toISOString() || "")}
            disablePast
            slotProps={{
              textField: {
                error: !!errors.date,
                helperText: errors.date?.message,
              },
            }}
          />


          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker label="Basic time picker"
                ampm={false}
                // minutesStep={30}
                onChange={(newDate: Dayjs | null) =>
                  setValue("start_time", newDate ? newDate.format("HH:mm:ss") : "")
                }
                slotProps={{
                  textField: {
                    error: !!errors.start_time,
                    helperText: errors.start_time?.message,
                  },
                }} />
            </DemoContainer>
          </LocalizationProvider>

          {/* <TextField
            label="Start Time (HH:mm)"
            {...register("start_time")}
            error={!!errors.start_time}
            helperText={errors.start_time?.message}
          /> */}


          {/* <TextField
            label="End Time (HH:mm)"
            {...register("end_time")}
            error={!!errors.end_time}
            helperText={errors.end_time?.message}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="Basic time picker"
                ampm={false}
                onChange={(newDate: Dayjs | null) =>
                  setValue("end_time", newDate ? newDate.format("HH:mm:ss") : "")
                }
                slotProps={{
                  textField: {
                    error: !!errors.end_time,
                    helperText: errors.end_time?.message,
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            label="Reason"
            {...register("reason")}
            error={!!errors.reason}
            helperText={errors.reason?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
