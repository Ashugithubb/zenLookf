"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import Navbar from "@/components/navbar/navabar";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Paper,
    TextField,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { bookServiceData, bookServiceThunk } from "@/app/redux/thunk/book.service.thunk";
import { toast, ToastContainer } from "react-toastify";
import { getUnavailableSlots } from "@/app/redux/thunk/slots/unavailable.slot.thunk";
import PaymentSystem from "@/app/paymentSystem/page";
import { setBookingDetails } from "@/app/redux/slice/add.b00king.slice";

export default function Bookings() {
    const param = useParams();
    const id = Number(param.serviceId);
    const service = useAppSelector((state) => state.service.servicelist?.services);
    const clickedService = service?.find((s) => s.serviceId === id);


    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(dayjs());
    const [error, setError] = useState<string>("");

    const timeSlots = [
        "09:00", "09:30",
        "10:00", "10:30",
        "11:00", "11:30",
        "12:00", "12:30",
        "13:00", "13:30",
        "14:00", "14:30",
        "15:00", "15:30",
        "16:00", "16:30",
        "17:00", "17:30",
        "18:00"
    ];


    const dispatch = useAppDispatch();

    if (!clickedService) {
        return (
            <>
                <Navbar />
                <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
                    Service not found.
                </Typography>
            </>
        );
    }


    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setMobileNumber(value);
            if (value.length === 10) setError("");
        }
    };

    const router = useRouter();
    const handleBookNow = async () => {
        if (!bookingDate) return setError("Please select a booking date.");
        if (!selectedSlot) return setError("Please select a time slot.");
        if (mobileNumber.length !== 10)
            return setError("Enter a valid 10-digit mobile number.");
        alert("Are You sure want to book");
        try {
            const res = await dispatch(bookServiceThunk({ serviceId: id, date: bookingDate.toISOString(), slot: selectedSlot, phoneNo: mobileNumber }));
            if (res.meta.requestStatus == "fulfilled") {
                toast.success("Booking Successfull See You Soon");
                setTimeout(() => {
                    router.push("/services/mybookings")
                }, 3000)
            }
            else {
                toast.error(res.payload || "Booking failed");
            }
        }
        catch (err) {
            toast.error("Booking failed");
        }
    };
    useEffect(() => {
        dispatch(getUnavailableSlots());
    }, [dispatch])

    useEffect(() => {
    if (bookingDate && selectedSlot && mobileNumber.length === 10) {
        dispatch(
            setBookingDetails({
                serviceId: id,
                date: bookingDate.toISOString(),
                slot: selectedSlot,
                phoneNo: mobileNumber,
            })
        );
    }
}, [bookingDate, selectedSlot, mobileNumber, id, dispatch]);

    const slots = useAppSelector((state) => state.unavailableSlot.slots);

    const disabledSlots = slots
        .filter((slot) => dayjs(slot.date).isSame(bookingDate, "day"))
        .flatMap((slot) => {
            const start = slot.start_time.slice(0, 5);
            const end = slot.end_time.slice(0, 5);
            const startIndex = timeSlots.indexOf(start);
            const endIndex = timeSlots.indexOf(end);
            if (startIndex !== -1 && endIndex !== -1) {
                return timeSlots.slice(startIndex, endIndex + 1);
            }
            return [];
        });
    let amount;
    const [disable, setDisable] = useState(false);

    return (
        <>
            <Navbar />
            <ToastContainer />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    mt: 5,
                    px: 3,
                }}
            >


                <Card
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        width: "90%",
                        maxWidth: 900,
                        boxShadow: 4,
                        borderRadius: 4,
                    }}
                >
                    <CardMedia
                        component="img"
                        image={clickedService.imageUrl}
                        alt={clickedService.title}
                        sx={{
                            width: { xs: "100%", md: "45%" },
                            height: 300,
                            borderRadius: "16px 0 0 16px",
                            objectFit: "cover",
                        }}
                    />
                    <CardContent sx={{ flex: 1, p: 4 }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {clickedService.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={2}>
                            {clickedService.description}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                     
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <CurrencyRupeeIcon fontSize="small" />
                            <Typography variant="h6" sx={{ ml: 0.5 }}>
                                {clickedService.price}
                            </Typography>
                            {clickedService.discount > 0 && (
                                <Typography
                                    variant="body2"
                                    color="green"
                                    sx={{ ml: 2, fontWeight: "bold" }}
                                >
                                    {clickedService.discount}% OFF
                                </Typography>
                            )}
                        </Box>


                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <AccessTimeIcon fontSize="small" color="action" />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                {clickedService.time} minutes
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary">
                            Category:{" "}
                            <strong style={{ color: "#1976d2" }}>
                                {clickedService.category}
                            </strong>
                        </Typography>


                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Select Booking Date
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={bookingDate}
                                    minDate={dayjs()}
                                    onChange={(newDate) => setBookingDate(newDate)}
                                    slotProps={{
                                        textField: { fullWidth: true },
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>


                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Select Time Slot
                            </Typography>
                            <ToggleButtonGroup
                                value={selectedSlot}
                                exclusive
                                onChange={(e, newSlot) => setSelectedSlot(newSlot)}
                                aria-label="time slot"
                                sx={{ flexWrap: "wrap", gap: 1 }}
                            >
                                {timeSlots.map((slot) => (
                                    <ToggleButton
                                        key={slot}
                                        value={slot}
                                        aria-label={slot}
                                        disabled={disabledSlots.includes(slot)}
                                    >
                                        {slot}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>

                        </Box>


                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Enter Mobile Number
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter 10-digit mobile number"
                                value={mobileNumber}
                                onChange={handleMobileChange}
                                inputProps={{ maxLength: 10 }}
                                error={!!error && mobileNumber.length !== 10}
                                helperText={
                                    error && mobileNumber.length !== 10 ? error : ""
                                }
                            />
                        </Box>


                        {selectedSlot && bookingDate && (
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 2,
                                    mt: 3,
                                    borderRadius: 2,
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Billing Summary
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: 1,
                                    }}
                                >
                                    <Typography variant="body2">Service Charge</Typography>
                                    <Typography variant="body2">
                                        ₹{clickedService.price}
                                    </Typography>
                                </Box>
                                {clickedService.discount > 0 && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            mb: 1,
                                        }}
                                    >
                                        <Typography variant="body2">Discount</Typography>
                                        <Typography variant="body2" color="green">
                                            -₹
                                            {(
                                                (clickedService.price * clickedService.discount) /
                                                100
                                            ).toFixed(2)}
                                        </Typography>
                                    </Box>
                                )}
                                <Divider sx={{ my: 1 }} />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography variant="body1" fontWeight="bold">
                                        Total
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        ₹
                                        {(
                                            amount = clickedService.price -
                                            (clickedService.price * clickedService.discount) / 100
                                        ).toFixed(2)}
                                    </Typography>
                                </Box>
                            </Paper>
                        )}


                        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                            <Button
                                variant="contained"
                                size="large"
                                disabled={
                                    !selectedSlot || !bookingDate || mobileNumber.length !== 10
                                }
                                onClick={handleBookNow}
                            >
                                on Site Payemnt
                            </Button>

                            {selectedSlot && bookingDate && mobileNumber.length == 10 && <PaymentSystem amount={amount!}/>}


                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
