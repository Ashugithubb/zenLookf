import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { serviceSchema } from './schema/service.schema';
import z from 'zod';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Avatar, Box, MenuItem, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '@/app/redux/hook/hook';
import { toast, ToastContainer } from 'react-toastify';
import { uploadImage } from '@/app/redux/thunk/upload.image';
import { addService } from '@/app/redux/thunk/add.service';
import { editServiceThunk, getServiceThunk } from '@/app/redux/thunk/service.thunk';
import { Service } from '@/app/redux/slice/services.slice';
import { resetServiceState } from '@/app/redux/slice/edit.slice';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
type ServiceData = z.infer<typeof serviceSchema>;
import style from "./add.module.css"
export default function CreateServiceDialog() {
    const [open, setOpen] = React.useState(false);
    const allServices = useAppSelector((state) => state.service.servicelist?.services) ?? [];
    const { editOpen, serviceId } = useAppSelector((state) => state.editService);
    const [editService, setService] = React.useState<Service | null>(null);

    useEffect(() => {
        if (editOpen) {
            setOpen(true);
            if (serviceId) {
                const found = allServices.find((s: Service) => s.serviceId === serviceId);
                if (found) {
                    setService(found)
                    setAvatarPreview(found.imageUrl);
                }
            }
        }
    }, [editOpen, serviceId]);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<ServiceData>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            category:"" ,
            time: 0,
            discount: 0,
        },
    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch(resetServiceState());
        setService(null);

    };
    useEffect(() => {
        if (editService) {
            reset({
                title: editService.title,
                description: editService.description,
                price: editService.price,
                category:
                    editService.category === "Male" || editService.category === "Female"
                        ? editService.category
                        : "Male",
                time: editService.time,
                discount: editService.discount,
            });
        }
    }, [editService, reset]);
    const dispatch = useAppDispatch();

    const [avtarUrl, setAvatarUrl] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
            const res = await dispatch(uploadImage(file));
            setAvatarUrl(res.payload)
        }
    };

    const onSubmit = async (data: ServiceData) => {
        try {
            data.imageUrl = avtarUrl;

            let res;
            if (editOpen && serviceId) {
                res = await dispatch(editServiceThunk({ data, id: serviceId }));
            } else {
                res = await dispatch(addService(data));
            }

            if (res.meta.requestStatus === 'fulfilled') {
                toast.success(editOpen ? 'Service updated successfully!' : 'Service added successfully!');
                dispatch(getServiceThunk({}));

                setTimeout(() => {
                    handleClose();
                }, 800);
            } else {
                toast.error(res.payload || 'Something went wrong!');
            }
        } catch (err) {
            toast.error('An error occurred!');
        }
    };

    return (
        <>

            <Button variant="outlined" onClick={handleClickOpen}>
                Add Services<AddIcon />
            </Button>
            <ToastContainer />
            <Dialog open={open}
                onClose={handleClose}
                className={style.form}
            >
                <DialogTitle> Add New Services Details</DialogTitle>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ position: "relative", display: "inline-block" }}>
                        {avatarPreview ? (
                            <img src={avatarPreview} height="50px" width="250px" alt="Preview" />
                        ) : null}

                        <Button
                            variant="outlined"
                            component="label"
                            size="small"
                            sx={{
                                border: "none"
                            }}
                        >
                            <AddPhotoAlternateIcon />
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                        </Button>
                    </Box>
                </Box>
                <DialogContent>
                    <DialogContentText>
                        Add all necessary Details for the Service
                    </DialogContentText>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "500px", paddingTop: "20px" }}>
                            <TextField
                                label="Title"
                                {...register("title")}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                fullWidth
                                className={style.title}

                            />

                            <TextField
                                label="Description"
                                {...register("description")}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                multiline
                                rows={3}
                                fullWidth
                                className={style.title}
                            />

                            <TextField
                                label="Price"
                                type="number"
                                {...register("price", { valueAsNumber: true })}
                                error={!!errors.price}
                                helperText={errors.price?.message}
                                fullWidth
                                className={style.title}
                            />

                            <TextField
                                label="Time (minutes)"
                                type="number"
                                {...register("time", { valueAsNumber: true })}
                                error={!!errors.time}
                                helperText={errors.time?.message}
                                fullWidth
                                className={style.title}

                            />

                            <TextField
                                label="Discount (%)"
                                type="number"
                                {...register("discount", { valueAsNumber: true })}
                                error={!!errors.discount}
                                helperText={errors.discount?.message}
                                fullWidth
                                className={style.title}
                            />

                            <TextField
                                select
                                label="Category"
                                {...register("category")}
                                 value={watch("category") || ""}
                                error={!!errors.category}
                                helperText={errors.category?.message}
                                fullWidth
                                className={style.title}
                                
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </TextField>

                            <Box className={style.button} >
                                <Button onClick={handleClose}>Cancel</Button>

                                {serviceId ? <Button type="submit" variant="contained">
                                    Update
                                </Button> : <Button type="submit" variant="contained">
                                    Submit
                                </Button>}
                            </Box>
                        </Box>
                    </form>


                </DialogContent>




            </Dialog>
        </>
    );
}
