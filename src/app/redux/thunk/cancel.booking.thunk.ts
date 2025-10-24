import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const cancelBookingThunk = createAsyncThunk(
    "cancel.booking", async (id:number, thunkAPI) => {
        try {
            const response = await axios.delete(
                 `${process.env.NEXT_PUBLIC_API_URL}/booking/${id}`,
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