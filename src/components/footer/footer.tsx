import { Box, Typography, IconButton, Divider } from "@mui/material";
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from "lucide-react";
import style from "./footer.module.css";

const Footer = () => {
  return (
    <footer id = "footer" className={style.footer}>
      <Box className={style.container}>
        
        <Box className={style.section}>
          <Typography variant="h5" className={style.logo}>ZenLook</Typography>
          <Typography variant="body2" className={style.text}>
            At ZenLook, we bring beauty, style, and confidence together. 
            Experience premium salon services designed to make you look and feel your best.
          </Typography>
        </Box>

       
        <Box className={style.section}>
          <Typography variant="h6" className={style.heading}>Opening Hours</Typography>
          <Typography>Mon - Fri: 09:00 AM - 6:00 PM</Typography>
          <Typography>Saturday: 10:00 AM - 7:00 PM</Typography>
          
        </Box>

        
        <Box className={style.section}>
          <Typography variant="h6" className={style.heading}>Contact Us</Typography>
          <Box className={style.info}>
            <Phone size={18} /> <Typography>+91 98765 43210</Typography>
          </Box>
          <Box className={style.info}>
            <Mail size={18} /> <Typography>support@zenlook.com</Typography>
          </Box>
          <Box className={style.info}>
            <MapPin size={18} /> <Typography>Mohali, Punjab, India</Typography>
          </Box>
        </Box>

        
        <Box className={style.section}>
          <Typography variant="h6" className={style.heading}>Follow Us</Typography>
          <Box className={style.social}>
            <IconButton href="https://instagram.com" target="_blank"><img src="./instagram.png" height={"30px"} width={"30px"}/></IconButton>
            <IconButton href="https://facebook.com" target="_blank"><img src="./communication.png" height={"30px"} width={"30px"}/></IconButton>
            <IconButton href="https://twitter.com" target="_blank"><img src="./twitter.png" height={"30px"} width={"30px"}/></IconButton>
          </Box>
        </Box>
      </Box>

      <Divider className={style.divider} />
      <Typography variant="body2" className={style.copy}>
        © {new Date().getFullYear()} ZenLook. All Rights Reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
