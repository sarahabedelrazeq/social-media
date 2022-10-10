import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
const Post = ({ image, text, time, user }) => {
  return (
    <div>
      <Card sx={{ marginBottom: "24px" }}>
        <CardHeader
          avatar={
            <img
              src={user.image}
              width={50}
              height={50}
              className="rounded-circle"
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
            alt="Paella dish"
          />
        )}

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
