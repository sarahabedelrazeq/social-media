import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
  Language,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import { useLanguage } from "hooks";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { switchLanguage, switchTheme } from "store/app";

const Sidebar = () => {
  const dispatch = useDispatch();
  const language = useLanguage();

  return (
    <Box position="fixed">
      <List>
        <ListItem disablePadding>
          <Link to="/">
            <ListItemButton component="a" href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={language.Homepage} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/profile/1">
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary={language.Profile} />
          </ListItemButton>
        </ListItem>
        {/* <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <Article />
            </ListItemIcon>
            <ListItemText primary={language.Pages} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary={language.Groups} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <Storefront />
            </ListItemIcon>
            <ListItemText primary={language.Marketplace} />
          </ListItemButton>
        </ListItem> */}
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={language.Friends} />
          </ListItemButton>
        </ListItem>
        {/* <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary={language.Settings} />
          </ListItemButton>
        </ListItem> */}
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <ModeNight />
            </ListItemIcon>
            <Switch onChange={(e) => dispatch(switchTheme())} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText
              primary={language.xLang}
              onClick={(e) =>
                dispatch(
                  switchLanguage(language.name === "English" ? "ar" : "en")
                )
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
