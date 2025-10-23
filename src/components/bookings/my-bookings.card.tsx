"use client"
import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Booking } from "@/app/redux/slice/booking.slice";
import { Box } from "lucide-react";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { cancelBookingThunk } from "@/app/redux/thunk/cancel.booking.thunk";
import { toast } from "react-toastify";

import { getAllBookings } from "@/app/redux/thunk/booking.thunk";
import { useRouter } from "next/navigation";
interface BookingCardProps {
  booking: Booking;
}
const SingleBookingCard = ({ booking }: BookingCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handelCancelClicked = async (id:number) => {
    confirm("Are Sure want to cancel the  Booking Because If any Payment is done then it is not refundable");
    const res = await dispatch(cancelBookingThunk(id));
     if (res.meta.requestStatus === 'fulfilled') {
          toast.success("Your Booking Got Cancled!");
         dispatch(getAllBookings({}));
        } else {
          toast.error(res.payload || "Unable to cancel Booking");
        }
  }
  return (
    <Card sx={{ maxWidth: 400, height: 650, margin: 1 }}>

      <CardMedia
        component="img"

        height="180"
        image={booking.service.imageUrl}
        alt={booking.service.title}
      />
      <CardContent>
        <Typography variant="h6">{booking.service.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {booking.service.description}
        </Typography>
        <Typography variant="subtitle1">
          Price: <CurrencyRupeeIcon fontSize="small" />
          {booking.service.price} (Discount: {booking.service.discount}%)
        </Typography>
        <Typography variant="subtitle2">
          Duration: {booking.service.time} mins | Category: {booking.service.category}
        </Typography>

        <hr />


        <Typography variant="body1">
          <strong>Booking Date:</strong> {booking.date}
        </Typography>
        <Typography variant="body1">
          <strong>Slot:</strong> {booking.slot}
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong> {booking.phoneNo}
        </Typography>
        <Typography variant="body1">
          <strong>Booked At:</strong>{" "}
          {new Date(booking.bookedAt).toLocaleString()}
        </Typography>
        <Typography variant="body1" > <strong>Payment:</strong>:{booking.paymentStatus}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={()=>handelCancelClicked(booking.bookingId)}>Cancel Booking</Button>
      </CardActions>
    </Card>
  );
};

export default SingleBookingCard;
