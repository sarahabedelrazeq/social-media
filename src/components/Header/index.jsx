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
  InputBase,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import AddPost from "components/AddPost";
import { navigate } from "helpers";
import supabase from "helpers/client";
import { useLanguage } from "hooks";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Search from "./components/Search";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const language = useLanguage();
  const user = useSelector(({ auth }) => auth.user);
  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login");
    }
  };
  const { search } = useParams();

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
          <img src="/images/sarah-logo.png" alt="logo" className="mw-100" />
        </Grid>
        <Grid
          item
          lg={6}
          xs={0}
          sx={{ display: { xs: "none", lg: "block" } }}
          px="16px"
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              let search = data.get("search");
              if (search && search.trim() !== "")
                navigate(`/search/${search.replace(/^\s+|\s+/gm, " ").trim()}`);
            }}
          >
            <Search>
              <InputBase
                placeholder="search..."
                className="w-100"
                name="search"
                defaultValue={search || ""}
                key={search}
              />
            </Search>
          </form>
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
        {user && user.id && (
          <MenuItem>
            <Link
              to={`/profile/${user.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {language.Profile}
            </Link>
          </MenuItem>
        )}

        <MenuItem>
          <AddPost>{language.addPost}</AddPost>
        </MenuItem>
        <MenuItem onClick={handleLogout}>{language.Logout}</MenuItem>
      </Menu>
    </AppBar>
  );
}
