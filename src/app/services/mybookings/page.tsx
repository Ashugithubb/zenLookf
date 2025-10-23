"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import { getAllBookings } from "@/app/redux/thunk/booking.thunk";
import SingleBookingCard from "@/components/bookings/my-bookings.card";
import Navbar from "@/components/navbar/navabar";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

export default function MyBookings() {
    const booking = useAppSelector((state) => state.allBooking.bookings);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllBookings({}));
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <Typography sx={{ fontSize: "40px", textAlign: "center", mt: 3 }}>
                All Your Bookings
            </Typography>

            {booking.length === 0 ? (
                <Typography sx={{ fontSize: "20px", textAlign: "center", mt: 5 }}>
                    No bookings found.
                </Typography>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 3,
                        mt: 3,
                        px: 2,
                    }}
                >
                    {booking.map((b) => (
                        <SingleBookingCard key={b.bookingId} booking={b} />
                    ))}
                </Box>
            )}
        </>
    );
}
