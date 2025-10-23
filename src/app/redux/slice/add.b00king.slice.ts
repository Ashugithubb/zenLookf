import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  serviceId: number;
  date: string;
  slot: string;
  phoneNo: string;
}

const initialState: BookingState = {
  serviceId: -1,
  date: "",
  slot: "",
  phoneNo: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDetails: (
      state,
      action: PayloadAction<{
        serviceId: number;
        date: string;
        slot: string;
        phoneNo: string;
      }>
    ) => {
      state.serviceId = action.payload.serviceId;
      state.date = action.payload.date;
      state.slot = action.payload.slot;
      state.phoneNo = action.payload.phoneNo;
    },

    resetBooking: (state) => {
      state.serviceId = -1;
      state.date = "";
      state.slot = "";
      state.phoneNo = "";
    },
  },
});

export const { setBookingDetails, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
