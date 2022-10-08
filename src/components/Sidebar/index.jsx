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
          <ListItemButton as={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText
              primary={language.Homepage}
              sx={{ color: "text.primary" }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton as={Link} to="/profile/1">
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText
              primary={language.Profile}
              sx={{ color: "text.primary" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={language.Friends} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ModeNight />
            </ListItemIcon>
            <Switch onChange={(e) => dispatch(switchTheme())} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
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
