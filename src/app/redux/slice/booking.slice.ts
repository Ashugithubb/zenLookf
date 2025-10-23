import { createSlice } from "@reduxjs/toolkit";
import { getAllBookings } from "../thunk/booking.thunk";


interface Service {
    serviceId: number;
    title: string;
    description: string;
    price: number;
    time: number;
    discount: number;
    imageUrl: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface User {
    userId: number;
    email: string;
    name: string;
    role: string;
    createdAt: string;
}

export interface Booking {
    bookingId: number;
    date: string;
    slot: string;
    phoneNo: string;
    paymentStatus:string,
    bookedAt: string;
    service: Service;
    user: User;
}

interface BookingState {
    bookings: Booking[];
    total: number;
    page: number;
    limit: number;
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    bookings: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
};

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        resetBookings(state) {
            state.bookings = [];
            state.total = 0;
            state.page = 1;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload.bookings || [];
                state.total = action.payload.total || 0;
                state.page = action.payload.page || 1;
                state.limit = action.payload.limit || 10;
            })
            .addCase(getAllBookings.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as string) || "Failed to fetch bookings.";
            });
    },
});

export const { resetBookings } = bookingSlice.actions;
export default bookingSlice.reducer;
