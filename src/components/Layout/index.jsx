import { Box, Stack } from "@mui/material";
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
    >
      <Header />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
          <Sidebar />
        </Box>
        <Box flex={4} p={{ xs: 0, md: 2 }}>
          {children}
        </Box>
        <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
          <Rightbar />
        </Box>
      </Stack>
      {/* <Add /> */}
    </Box>
  );
}
