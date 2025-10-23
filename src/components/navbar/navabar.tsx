"use client"
import { Box, Button, Link, Typography } from "@mui/material";
import style from "./navbar.module.css";
import { Height } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import { clearUser } from "@/app/redux/slice/login.slice";
import { toast, ToastContainer } from "react-toastify";
import { logoutUser } from "@/app/redux/thunk/auth/login.thunk";

export default function Navbar() {
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.login) ?? "";
  const token = useAppSelector((state) => state.login.auth?.token);
  const dispatch = useAppDispatch();
  const handelLogin = () => {
    router.push("/login");
  }
  const handelLogOut = () => {
    try {
      dispatch(clearUser());
      const res = dispatch(logoutUser());
      toast("log out successfully");
     router.push("/services");

    }
    catch (error) {
      toast.error("unable to log out");
    }
  }
  return (<>
    <ToastContainer />
    <Box className={style.navbar}>
      {/* <Typography className={style.logo}> ZenLook</Typography> */}
       <Link href="/" className={style.logo}>ZenLook</Link>
      <Box className={style.right}>
        <Link href="/" className={style.link}>Home</Link>
        <Link href="/#about" className={style.link}>About</Link>
        <Link href="/#footer" className={style.link}>Contact</Link>
        <Link href="/services" className={style.link}>Services</Link>
        {
          !token ? (<Button onClick={handelLogin} variant="contained" className={style.loginBtn}>
            Login
          </Button>) :

            (< Button onClick={handelLogOut} variant="contained" className={style.loginBtn}>
              Log out
            </Button>)}
      </Box>
    </Box >
  </>
  );
}
