import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetServiceQuery } from "../slice/services.slice";
import qs from 'qs';
import { stat } from 'fs';
import axios from "axios";
import { serviceSchema } from "@/components/service/schema/service.schema";
import z from "zod";
export const getServiceThunk = createAsyncThunk(
  'service/getservice',
  async (query: GetServiceQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/services`, {
        withCredentials: true,
        params: query,
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
      });
      console.log("services", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch service');
    }
  }
);


export const deleteServiceThunk = createAsyncThunk(
  "services/deleteService",
  async (serviceId: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/services/${serviceId}`
      );
      return serviceId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete service");
    }
  }
);

type ServiceData = z.infer<typeof serviceSchema>;
export const editServiceThunk = createAsyncThunk(
    'contact/edit',
    async ({data,id}: {data:ServiceData,id:number}, thunkAPI) => {
        try {
            const response = await axios.patch(
                `http://localhost:3001/services/${id}`,
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


export const getTopServiceThunk = createAsyncThunk(
  'topService/gettopservice',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/services/top/three`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch service');
    }
  }
);