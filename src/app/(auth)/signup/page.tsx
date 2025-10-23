'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Button,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    Link as MuiLink,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';
import { signupSchema } from './schema/user.schema';
import { useAppDispatch } from '@/app/redux/hook/hook';
import style from './page.module.css'
import { signupUser } from '@/app/redux/thunk/auth/signup.thunk';


type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: SignupFormData) => {
        const res = await dispatch(signupUser(data));
        if (res.meta.requestStatus === 'fulfilled') {
            toast.success("Signup successful!");
            router.push('/login');
        } else {
            toast.error(res.payload || "Signup failed");
        }
    };

    return (
        <>
            <ToastContainer />
            <Box className={style.signupContainer}>
                <Box className={style.signupCard}>
                    <Typography className={style.title}>Create Account</Typography>
                    <Typography className={style.subtitle}>
                        Join ZenLook and experience premium salon care
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Box className={style.form}>
                            <TextField
                                label="Full Name"
                                variant="outlined"
                                fullWidth
                                className={style.input}
                                {...register('name')}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                className={style.input}
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                variant="outlined"
                                fullWidth
                                className={style.input}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                className={style.input}
                                {...register('confirmPassword')}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                            <Button type='submit' variant="contained" fullWidth className={style.btn}>
                                Sign Up
                            </Button>
                        </Box>
                    </form>
                    <Typography className={style.footerText}>
                        Already have an account? <span onClick={() => router.push("./login")}>Login</span>
                    </Typography>
                </Box>
            </Box>

        </>
    );
}