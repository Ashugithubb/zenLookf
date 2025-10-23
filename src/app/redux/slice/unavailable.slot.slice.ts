import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUnavailableSlot, getUnavailableSlots } from "../thunk/slots/unavailable.slot.thunk";

export interface UnavailableSlot {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  reason: string;
}

interface UnavailableSlotState {
  slots: UnavailableSlot[];
  loading: boolean;
  error: string | null;
}

const initialState: UnavailableSlotState = {
  slots: [],
  loading: false,
  error: null,
};

const unavailableSlotSlice = createSlice({
  name: "unavailableSlot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CREATE slot
    builder
      .addCase(createUnavailableSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUnavailableSlot.fulfilled, (state, action: PayloadAction<UnavailableSlot>) => {
        state.loading = false;
        state.slots.push(action.payload); // add new slot to array
      })
      .addCase(createUnavailableSlot.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    // GET all slots
    builder
      .addCase(getUnavailableSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUnavailableSlots.fulfilled, (state, action: PayloadAction<UnavailableSlot[]>) => {
        state.loading = false;
        state.slots = action.payload; // replace with fetched slots
      })
      .addCase(getUnavailableSlots.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default unavailableSlotSlice.reducer;
