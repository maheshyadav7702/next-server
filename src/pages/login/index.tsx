import React from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Grid } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

const Login = () => {
  return (
    <>
      <Grid className={`${styles.main} ${inter.className}`}>Login</Grid>
      <Grid>test</Grid>
      <Grid>test</Grid>

      <Grid>mahesh</Grid>
    </>
  );
};

export default Login;
