import { Box, Grid, Stack } from "@mui/material";
import Header from "components/Header";
import Rightbar from "components/Rightbar";
import Sidebar from "components/Sidebar";
import React from "react";

export default function Layout({ children }) {
  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      minHeight="100vh"
      maxWidth="100vw"
    >
      <Header />
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item lg={2} sx={{ display: { xs: "none", lg: "block" } }}>
          <Sidebar />
        </Grid>
        <Grid item lg={6} xs={12}>
          {children}
        </Grid>
        <Grid item lg={4} sx={{ display: { xs: "none", lg: "block" } }}>
          <Rightbar />
        </Grid>
      </Grid>
      {/* <Add /> */}
    </Box>
  );
}
