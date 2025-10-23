import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs'
import { stat } from 'fs';
import { id } from 'zod/v4/locales';
import { deleteServiceThunk, editServiceThunk, getServiceThunk } from '../thunk/service.thunk';
export interface Service {
    serviceId: number,
    title: string
    description: string,
    price: number,
    time: number,
    discount: number,
    imageUrl: string,
    category: string
}

export interface ServiceResponse {
    total: number;
    page: number;
    limit: number;
    services: Service[];
}

interface ServiceState {
    servicelist: ServiceResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: ServiceState = {
    servicelist: null,
    loading: false,
    error: null,
};


export interface GetServiceQuery {
    page?: number;
    limit?: number;
    search?: string

}

const serviceSlice = createSlice({
    name: 'servicelist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getServiceThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getServiceThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.servicelist = action.payload;
            })
            .addCase(getServiceThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteServiceThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (state.servicelist?.services) {
                    state.servicelist.services = state.servicelist.services.filter(
                        (s) => s.serviceId !== Number(action.payload)
                    );
                }
            })
            .addCase(editServiceThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (state.servicelist?.services) {
                    state.servicelist.services = state.servicelist.services.filter(
                        (s) => s.serviceId !== Number(action.payload)
                    );
                }
            })



    }
});


export default serviceSlice.reducer;