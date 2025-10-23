import { createUnavailableSlotSchema } from "@/components/unavilable-slots/schema/unavilable-slot.schema";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import z from "zod";

type FormData = z.infer<typeof createUnavailableSlotSchema>;
export const createUnavailableSlot = createAsyncThunk(
  "unavailableSlot/createUnavailableSlot",
  async (slotData:FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/unavailable-slots", slotData,
      {
        withCredentials:true
      }
      );
      return response.data; 
    } catch (error:any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getUnavailableSlots = createAsyncThunk(
  "unavailableSlot/getUnavailableSlots",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/unavailable-slots",
        {
        withCredentials:true
      }
      );
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

