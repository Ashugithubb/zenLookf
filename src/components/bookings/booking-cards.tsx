import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Stack } from "@mui/material";
import { Booking } from "@/app/redux/slice/booking.slice";


interface BookingCardProps {
    booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
    return (
        <Card sx={{ width: 350, display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
            <CardMedia
                component="img"
                height="180"
                image={booking.service.imageUrl}
                alt={booking.service.title}
                sx={{ borderRadius: 1 }}
            />

            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

                <Typography variant="h6">{booking.service.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {booking.service.description}
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Typography variant="body2">Price: ₹{booking.service.price}</Typography>
                    <Typography variant="body2" color="primary">
                        Discount: {booking.service.discount}%
                    </Typography>
                </Stack>
                <Typography variant="body2">
                    Category: {booking.service.category}
                </Typography>
                <Typography variant="body2">
                    Duration: {booking.service.time} minutes
                </Typography>

                <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle2">Booking Details</Typography>
                    <Typography variant="body2">Booking ID: {booking.bookingId}</Typography>
                    <Typography variant="body2">Date: {booking.date}</Typography>
                    <Typography variant="body2">Slot: {booking.slot}</Typography>
                    <Typography variant="body2">Booked At: {new Date(booking.bookedAt).toLocaleString()}</Typography>

                </Box>


                <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle2">User Details</Typography>
                    <Typography variant="body2">Name: {booking.user.name}</Typography>
                    <Typography variant="body2">Email: {booking.user.email}</Typography>
                    <Typography variant="body2">Phone: {booking.phoneNo}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
