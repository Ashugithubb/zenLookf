import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const cancelBookingThunk = createAsyncThunk(
    "cancel.booking", async (id:number, thunkAPI) => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/booking/${id}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)