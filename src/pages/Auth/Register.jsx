import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useLanguage } from "hooks";
import supabase from "helpers/client";
import { Alert } from "@mui/material";

export default function Register() {
  const language = useLanguage();
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let { user, error } = await supabase.auth.signUp({
      email: data.get("email"),
      password: data.get("password"),
    });
    if (error && error.message) setError(error.message);
    else {
      const { data: userData, error: userDataError  } = await supabase.from("userData").insert([
        {
          image:
            "https://jhdpgjjcbrlbvddzodju.supabase.co/storage/v1/object/public/users/default_user%20(1).png",
          user_id: user.id,
          name: data.get("name")
        },
      ]);
      if (userDataError && userDataError.message) setError(userDataError.message);

      setMessage(language.registerMessage);

    }
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        {language.register}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        {error !== "" && <Alert severity="error">{error}</Alert>}
        {message !== "" && <Alert severity="success">{message}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {language.register}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
