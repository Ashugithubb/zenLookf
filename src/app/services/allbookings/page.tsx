"use client"
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import { getAllBookings } from "@/app/redux/thunk/booking.thunk";
import SearchComponent from "@/components/bookings/search";
import GenderSelectComponent from "@/components/bookings/category";
import Navbar from "@/components/navbar/navabar";
import TimeSelector from "@/components/bookings/slot";
import { Dayjs } from "dayjs";
import DateRangeFilter from "@/components/bookings/date";
import BookingCard from "@/components/bookings/booking-cards";
import { Typography, Card, CardContent, Grid, Box } from "@mui/material";
import UnavailableSlotForm from "@/components/unavilable-slots/unavilable.slots";

interface FilterValues {
  search: string;
  category: string;
  slot: Dayjs | null;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const FiltersComponent = () => {
  const bookings = useAppSelector((state) => state.allBooking.bookings) ?? [];
  const dispatch = useAppDispatch();

  const { control, watch, setValue } = useForm<FilterValues>({
    defaultValues: {
      search: "",
      category: "",
      slot: null,
      startDate: null,
      endDate: null,
    },
  });

  const watchedValues = watch();

const filterValues = React.useMemo(() => watchedValues, [JSON.stringify(watchedValues)]);

 useEffect(() => {
  const formattedFilters = {
    page: 1,
    limit: 10,
    search: filterValues.search || undefined,
    category: filterValues.category || undefined, 
   slot: filterValues.slot ? filterValues.slot.format("HH:mm") : undefined,
    startDate: filterValues.startDate ? filterValues.startDate.toISOString() : undefined,
    endDate: filterValues.endDate ? filterValues.endDate.toISOString() : undefined,
  };

  dispatch(getAllBookings(formattedFilters));
}, [filterValues, dispatch]);
const [open,setOpen] = useState(false);
  return (
    <>
      <Navbar />
 <Box sx={{paddingTop:"15px"}}><UnavailableSlotForm/></Box>
      <Box sx={{ mt: 8, px: 4 }}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "#fafafa",
            mb: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ textAlign: "center", mb: 3 }}
            >
              Bookings Filter
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="search"
                  control={control}
                  render={({ field }) => (
                    <SearchComponent {...field} placeholder="Search bookings..." />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <GenderSelectComponent {...field} placeholder="Select Gender" />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <Controller
                  name="slot"
                  control={control}
                  render={({ field }) => (
                    <TimeSelector {...field} label="Select Time" />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DateRangeFilter
                      startDate={field.value}
                      endDate={filterValues.endDate}
                      onStartChange={field.onChange}
                      onEndChange={(val) => setValue("endDate", val)}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {bookings.length === 0 ? (
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{ mt: 8 }}
          >
            No Booking Found
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {bookings.map((b) => (
              <Grid item xs={12} sm={6} md={4} key={b.bookingId}>
                <BookingCard booking={b} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default FiltersComponent;
