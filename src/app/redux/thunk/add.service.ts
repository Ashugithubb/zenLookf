

import { serviceSchema } from '@/components/service/schema/service.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';
type ServiceData = z.infer<typeof serviceSchema>;

export const addService = createAsyncThunk(
    'add/service',
    async (data: ServiceData, thunkAPI) => {
        try {
            const response = await axios.post(
                'http://localhost:3001/services',
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

