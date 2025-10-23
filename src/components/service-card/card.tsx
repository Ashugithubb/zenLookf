'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import style from './card.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '@/app/redux/hook/hook';
import { deleteServiceThunk } from '@/app/redux/thunk/service.thunk';
import { toast } from 'react-toastify';
import CreateServiceDialog from '../service/add-service';
import { Service } from '@/app/redux/slice/services.slice';
import { setEditOpen, setServiceId } from '@/app/redux/slice/edit.slice';
import { useRouter } from 'next/navigation';
interface cardProp {
  title: string;
  description: string;
  price: number,
  imageUrl: string,
  discount: number,
  serviceId: number
}

export default function ImgMediaCard(prop: cardProp) {
  const dispatch = useAppDispatch()
  const role = useAppSelector((state) => state.login.auth?.role);
  const services = useAppSelector((state) => state.service.servicelist?.services);

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${prop.title}"?`)) {
      try {
        const res = await dispatch(deleteServiceThunk(prop.serviceId));
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Service deleted successfully!");
        }
      } catch (err: any) {
        toast.error(err || "Failed to delete service");
      }
    }
  };
  const router = useRouter()
  const handleEdit = async () => {
    dispatch(setEditOpen(true));
    dispatch(setServiceId(prop.serviceId));
  };

  const handelBook = () => {
    if (role === "User") {
      router.push(`/services/booking/${prop.serviceId}`);
    }
    else if (role === "Admin") {
      toast.error("Admin cannot Book a service");
    }
    else {
      toast.error("Please Login to  Book Services");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }

  return (
    <Card sx={{ maxWidth: 445 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="160"
        image={prop.imageUrl}
        sx={{
          cursor: 'pointer',
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            opacity: 0.9,
          },
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {prop.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {prop.description}
        </Typography>
        <Typography variant="h3" sx={{ color: 'text.secondary' }}>
          <CurrencyRupeeIcon />{prop.price}
        </Typography>
      </CardContent>
      {prop.discount !== 0 && (
        <Box
          sx={{
            display: 'inline-block',
            backgroundColor: '#c4a842ff',
            color: 'white',
            fontWeight: 'bold',
            px: 1.5,
            py: 0.5,
            borderRadius: '12px',
            fontSize: '0.9rem',
            mt: 1,
            ml: 2,
            width: 'fit-content',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {prop.discount}% OFF
        </Box>
      )}


      {role != 'Admin' ? (<CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handelBook} variant='contained' size="small" className={style.bookNowBtn}>Book Now</Button>
      </CardActions>) :

        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={handleDelete} sx={{ color: "red" }}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          {role != 'Admin' && <Button
            onClick={handelBook}
            variant="contained"
            size="medium"
            className={style.bookNowBtn}>
            Book Now
          </Button>}
        </CardActions>}


    </Card>
  );
}
