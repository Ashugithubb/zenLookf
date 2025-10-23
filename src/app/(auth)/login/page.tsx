'use client'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import {
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/app/redux/hook/hook';
import style from './page.module.css'
import { loginUser } from '@/app/redux/thunk/auth/login.thunk';
import { auth } from '../../fierbase/firebase'
import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signupUser } from '@/app/redux/thunk/auth/signup.thunk';


export const loginSchema = z.object({
  email: z.string().min(6, { message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const notify = () => toast("Login Successfull!");
  const onSubmit = async (data: LoginFormData) => {
    const res = await dispatch(loginUser(data));

    if (res.meta.requestStatus === 'fulfilled') {
      toast.success("Login successful!");
      router.push('/');
    } else {
      toast.error(res.payload || "Login failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };



  const handelGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);


      const additionalInfo = getAdditionalUserInfo(result);

      const user = result.user;
      const name = user.displayName || "Google User";
      const email = user.email!;
      const password = user.uid;
      const firebase = "firbase";

      console.log("Google user:", user);
      console.log("Is new user?", additionalInfo?.isNewUser); 

      if (additionalInfo?.isNewUser) {
         
        const res = await dispatch(
          signupUser({ name, email, password, confirmPassword: password,firebase })
        );
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Account created successfully!");
          router.push("/");
        } else {
          toast.error(res.payload || "Signup failed");
        }
      } else {

        const res = await dispatch(loginUser({ email, password }));
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Login successful!");
          router.push("/");
        } else {
          toast.error(res.payload || "Login failed");
        }
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error(error.message || "Login failed");
    }
  };



  return (

    <>
      <ToastContainer />
      <Box className={style.loginContainer}>
        <Box className={style.loginCard}>
          <Typography className={style.title}>Welcome Back!</Typography>
          <Typography className={style.subtitle}>
            Log in to continue your ZenLook experience
          </Typography>


          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box className={style.form}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                className={style.input}
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                className={style.input}
              />
              <Button type='submit' variant="contained" fullWidth className={style.btn}>
                Login
              </Button>
              <Button size='small' variant='outlined' onClick={handelGoogleLogin}>
                <img src="./google.png" height="30px" width="30px" style={{ paddingRight: "10px" }} />
                Continue with Google
              </Button>
            </Box>

          </form>


          <Typography className={style.footerText}>
            Don’t have an account? <span onClick={() => router.push("/signup")}>Sign Up</span>
          </Typography>
        </Box>
      </Box>
    </>
  );
}