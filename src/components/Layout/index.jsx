import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { Menu, Home, Group } from "@mui/icons-material";
import Header from "components/Header";
import Rightbar from "components/Rightbar";
import Sidebar from "components/Sidebar";
import React from "react";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const [value, setValue] = React.useState(1);
  const { friends } = useSelector(({ user }) => user);

  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      minHeight="100vh"
      maxWidth="100vw"
      mx={0}
    >
      <Header />
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        width="100%"
        mx={0}
        pt="16px"
      >
        <Grid
          item
          lg={2}
          xs={12}
          sx={{ display: { xs: value !== 0 && "none", lg: "block" } }}
          px="16px"
        >
          <Sidebar />
        </Grid>
        <Grid
          item
          lg={6}
          xs={12}
          px="16px"
          sx={{ display: { xs: value !== 1 && "none", lg: "block" } }}
        >
          {children}
        </Grid>
        <Grid
          item
          lg={4}
          xs={12}
          sx={{ display: { xs: value !== 2 && "none", lg: "block" } }}
          px="16px"
        >
          <Rightbar friends={friends} />
        </Grid>
      </Grid>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: { lg: "none" },
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction icon={<Menu />} />
          <BottomNavigationAction icon={<Home />} />
          <BottomNavigationAction icon={<Group />} />
        </BottomNavigation>
      </Paper>

      {/* <Add /> */}
    </Box>
  );
}
