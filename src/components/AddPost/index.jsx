import {
  Alert,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import supabase from "helpers/client";
import { useLanguage } from "hooks";
import React from "react";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxWidth: "100vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddPost({ children }) {
  const language = useLanguage();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddPost = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);

    const { data: post, error } = await supabase.from("posts").insert([
      {
        text: data.get("text"),
        image: image
          ? "https://jhdpgjjcbrlbvddzodju.supabase.co/storage/v1/object/public/" +
            image
          : "",
        user_id: 1,
      },
    ]);
    setLoading(false);

    if (error && error.message) setError(error.message);
    else if (post) setOpen(false);
  };
  const uploadImage = React.useCallback(async ({ target: { files } }) => {
    const avatarFile = files[0];
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("posts")
      .upload("public/post-" + moment() + ".png", avatarFile);
    setLoading(false);
    console.log("data", data, files, error);
    if (data) setImage(data.Key);
    if (error) setError(error.message);
  }, []);

  return (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
        className="p-0 border-0 bg-transparent"
        color="inherit"
      >
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            {language.addPost}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleAddPost}
            sx={{ mt: 1 }}
          >
            {error !== "" && <Alert severity="error">{error}</Alert>}

            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="text"
              name="text"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="image"
              type="file"
              id="image"
              onChange={uploadImage}
            />
            {!loading && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {language.addPost}
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
