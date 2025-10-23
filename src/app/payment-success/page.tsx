"use client";

import { useEffect } from "react";
import Navbar from "@/components/navbar/navabar";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { bookServiceThunk } from "../redux/thunk/book.service.thunk";
import { resetBooking } from "../redux/slice/add.b00king.slice";

export default function PaymentSuccess() {
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.b00king);

  useEffect(() => {
    const bookAndClear = async () => {
      if (
        booking.serviceId &&
        booking.date &&
        booking.slot &&
        booking.phoneNo
      ) {
       
        const res = await dispatch(
          bookServiceThunk({
            serviceId: booking.serviceId,
            date: booking.date,
            slot: booking.slot,
            phoneNo: booking.phoneNo,
          })
        );
        if (res.meta.requestStatus === "fulfilled") {
          console.log("fulfilled jaa raha huu me na")
          dispatch(resetBooking());
        }
      }
    };
    bookAndClear();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <h1>Payment Successful</h1>
        <p>Thank you for your payment.</p>
      </div>
    </>
  );
}
