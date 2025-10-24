import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Dayjs } from "dayjs";
import qs from 'qs';

export interface GetBookingServiceQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;         
  startDate?: string | null; 
  endDate?: string | null;   
  slot?: string | null;      
}

export const getAllBookings = createAsyncThunk(
  'allbookings/bookings',
  async (query: GetBookingServiceQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        withCredentials: true,
        params: query,
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch service');
    }
  }
);