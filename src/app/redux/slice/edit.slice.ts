import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceState {
  editOpen: boolean;
  serviceId: number | null;
}

const initialState: ServiceState = {
  editOpen: false,
  serviceId: null,
};

const serviceSlice = createSlice({
  name: "editService",
  initialState,
  reducers: {
    setEditOpen: (state, action: PayloadAction<boolean>) => {
      state.editOpen = action.payload;
    },
    setServiceId: (state, action: PayloadAction<number | null>) => {
      state.serviceId = action.payload;
    },
    resetServiceState: (state) => {
      state.editOpen = false;
      state.serviceId = null;
    },
  },
});

export const { setEditOpen, setServiceId, resetServiceState } = serviceSlice.actions;
export default serviceSlice.reducer;
