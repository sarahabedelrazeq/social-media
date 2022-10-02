import {
  Mail,
  Notifications,
  Search as SearchIcon,
  AccountCircle,
} from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Grid,
  Toolbar,
} from "@mui/material";
import supabase from "helpers/client";
import { useLanguage } from "hooks";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./components/Search";
import StyledToolbar from "./components/StyledToolbar";

export default function Header() {
  const [open, setOpen] = useState(false);
  const language = useLanguage();
  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut()
  }

  return (
    <AppBar position="sticky">
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        mx={0}
      >
        <Grid item lg={2} xs={4} px="16px">
          <img src="/images/sarah-logo.png" className="mw-100" />
        </Grid>
        <Grid
          item
          lg={6}
          xs={0}
          sx={{ display: { xs: "none", lg: "block" } }}
          px="16px"
        >
          <Search>
            <InputBase placeholder="search..." className="w-100" />
          </Search>
        </Grid>
        <Grid item lg={4} xs={8} px="16px">
          <ul className="d-flex justify-content-end align-items-center h-100 m-0 w-100 p-0">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <Mail />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="demo-positioned-menu"
              aria-haspopup="true"
              onClick={setOpen}
              color="inherit"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="demo-positioned-menu"
              aria-haspopup="true"
              onClick={setOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </ul>
        </Grid>
      </Grid>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: language.direction === "ltr" ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: language.direction === "ltr" ? "right" : "left",
        }}
        sx={{
          top: 45,
        }}
      >
        <MenuItem>
          <Link
            to="/profile/1"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {language.Profile}
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>{language.Logout}</MenuItem>
      </Menu>
    </AppBar>
  );
}
