import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import client from "helpers/client";
import React from "react";
import { useSelector } from "react-redux";

const Post = ({ image, text, time, user, liks, id }) => {
  const currentUser = useSelector(({ auth }) => auth.user);
  const [liked, setLiked] = React.useState();

  React.useEffect(() => {
    if (liks.filter(({ user_id }) => user_id === currentUser.id).length > 0)
      setLiked(true);
  }, [liks, currentUser.id]);

  const handleLike = async (event) => {
    if (!liked) {
      const { data } = await client.from("liks").insert([
        {
          user_id: currentUser.id,
          post_id: id,
        },
      ]);
      if (data) setLiked(true);
    } else {
      let { data } = await client
        .from("liks")
        .delete(`*`)
        .eq("user_id", currentUser.id)
        .eq("post_id", id);
      if (data) setLiked(false);
    }
  };

  return (
    <div>
      {user && (
        <Card sx={{ marginBottom: "24px" }}>
          <CardHeader
            avatar={
              <img
                src={user.image}
                width={50}
                height={50}
                className="rounded-circle"
                alt={user.name}
              />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={user.name}
            subheader={time}
          />
          {image && (
            <CardMedia
              component="img"
              height="20%"
              image={image}
              alt={text.slice(0, 30)}
            />
          )}

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={handleLike} aria-label="add to favorites">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
                checked={liked}
                key={liked}
              />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default Post;
