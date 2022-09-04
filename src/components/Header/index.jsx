import { Mail, Notifications, Pets, AccountCircle } from "@mui/icons-material";
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
} from "@mui/material";
import { useLanguage } from "hooks";
import React, { useState } from "react";
import Search from "./components/Search";
import StyledToolbar from "./components/StyledToolbar";

export default function Header() {
  const [open, setOpen] = useState(false);
  const language = useLanguage();

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <img src="/images/sarah-logo.png" />
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="search..." />
        </Search>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </StyledToolbar>
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
        <MenuItem>{language.Profile}</MenuItem>
        <MenuItem>{language.Myaccount}</MenuItem>
        <MenuItem>{language.Logout}</MenuItem>
      </Menu>
    </AppBar>
  );
}
