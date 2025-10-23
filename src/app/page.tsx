"use client"
import Carosole from "@/components/carosole/carosole";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navabar";
import ServiceCard from "@/components/service-card/p.card";
import { Box, Button } from "@mui/material";
import style from '../app/style/page.module.css'
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Carosole />
      <Box className={style.servicesSection}>
        <Box className={style.heading}>Our Services</Box>
        <Box className={style.subHeading}>Top 3 Popular Services</Box>
        <Box className={style.description}>
          Discover our most loved treatments, designed to make you look and feel your absolute best.
        </Box>
      </Box>

      <Box className={style.card}>
        <ServiceCard serviceId={1} title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-" price={500} discount={0} imageUrl="./salon-service.jpg"/>
          <ServiceCard serviceId={1} title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-" price={1150} discount={0} imageUrl="./image4.jpg"/>
         <ServiceCard  serviceId={1} title="Hair Coloring & Styling" description="Transform your look with our expert color treatments and precision cuts. Our stylists use premium products to achieve stunning, long-" price={650} discount={0} imageUrl="./cream.png"/>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center",padding:"100px" }}>
        <Button onClick={()=>router.push("/services")} className={style.viewAllBtn} variant="contained">View All Services</Button></Box>
      <Footer />

    </>

  );
}

