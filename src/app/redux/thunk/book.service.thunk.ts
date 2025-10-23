

import { serviceSchema } from '@/components/service/schema/service.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';
export interface bookServiceData {
    date: string,
    slot: string,
    phoneNo: string
    serviceId:number
}

export const bookServiceThunk = createAsyncThunk(
    'book/service',
    async (data: bookServiceData, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:3001/services/${data.serviceId}/booking`,
                data,
                { withCredentials: true }
            );
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

