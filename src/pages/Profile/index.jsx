import {
  Skeleton,
  Grid,
  Typography,
  Box,
  Alert,
  TextField,
  Modal,
  Button,
} from "@mui/material";
import React from "react";
import Post from "components/Post";
import { useParams } from "react-router-dom";
import { client } from "helpers";
import { useLanguage } from "hooks";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { Add } from "@mui/icons-material";
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

export default function Profile() {
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();
  const [posts, setPosts] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [isCurrentUser, setIsCurrentUser] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const language = useLanguage();
  const currentUser = useSelector(({ auth }) => auth.user);

  const getPosts = React.useCallback(async (id) => {
    setLoading(true);
    let { data: posts, error } = await client
      .from("posts")
      .select(`*, userData(*), liks(*)`)
      .eq("user_id", id)
      .order("id", { ascending: false });

    setLoading(false);
    if (error) setPosts([]);
    else setPosts(posts);
  }, []);

  const getUserData = React.useCallback(
    async (id) => {
      setLoading(true);
      let { data: userData, error } = await client
        .from("userData")
        .select(`*`)
        .eq("id", id);
      setLoading(false);
      if (userData && userData.length > 0 && !error) {
        setUser(userData[0]);
        if (currentUser.id === userData[0].id) {
          setIsCurrentUser(true);
        } else {
          let { data: following, error } = await client
            .from("following")
            .select(`*`)
            .eq("user_id", currentUser.id)
            .eq("following_id", userData[0].id);

          if (!error && following.length > 0) setIsFollowing(true);
          else setIsFollowing(false);
        }
      } else {
        setIsCurrentUser(false);
        setUser({});
      }
    },
    [currentUser]
  );

  const handleFollow = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (isFollowing) {
      let { data: following, error } = await client
        .from("following")
        .delete(`*`)
        .eq("user_id", currentUser.id)
        .eq("following_id", user.id);

      setLoading(false);
      if (!error) getUserData(id);
    } else {
      const { data: following, error } = await client.from("following").insert([
        {
          user_id: currentUser.id,
          following_id: user.id,
        },
      ]);

      setLoading(false);
      if (!error) getUserData(id);
    }
  };

  React.useEffect(() => {
    if (id) {
      getUserData(id);
      getPosts(id);
    }
  }, [getUserData, getPosts, id]);

  const uploadImage = React.useCallback(
    async ({ target: { files } }) => {
      const avatarFile = files[0];
      const { data, error } = await client.storage
        .from("users")
        .upload("public/user-" + moment() + ".png", avatarFile);
      if (data) {
        const { error } = await client
          .from("userData")
          .update([
            {
              image:
                "https://jhdpgjjcbrlbvddzodju.supabase.co/storage/v1/object/public/" +
                data.Key,
            },
          ])
          .eq("id", currentUser.id);

        if (!error) getUserData(id);
      }
    },
    [currentUser, getUserData, id]
  );

  return (
    <div id="profile-page" className="page-container">
      <sections>
        {loading || !user.id ? (
          <Grid>
            <Skeleton variant="text" height={300} marginBottom="200px" />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="rectangular" height={300} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="rectangular" height={300} />
          </Grid>
        ) : (
          <Grid>
            <Grid>
              <Box m="-16px" mb={0}>
                <img
                  src="/images/bg1.jpg"
                  alt={user.name}
                  className="w-100"
                  height="300"
                />
              </Box>
              <Box
                marginTop="-110px"
                className="d-flex justify-content-center mb-3"
              >
                <Box
                  sx={{
                    padding: "10px",
                    borderRadius: "50%",
                    backgroundColor: "gray",
                  }}
                >
                  <img
                    src={user.image}
                    alt={user.name}
                    width="200"
                    height="200"
                    className="rounded-circle object-fit-cover"
                  />
                </Box>
              </Box>
              <Box className="mb-5">
                <Typography variant="h5" component="h2" className="text-center">
                  {user.name}
                </Typography>
                {isCurrentUser ? (

                    <Button variant="contained" component="label">
                      edit image
                      <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={uploadImage}
                        hidden
                      />
                    </Button>
                ) : isFollowing ? (
                  <Button onClick={handleFollow}>following</Button>
                ) : (
                  <Button onClick={handleFollow}>
                    {language.followFriends}
                  </Button>
                )}
              </Box>
              <Box>
                {posts.map((post, index) => (
                  <Post {...post} user={user} key={index} />
                ))}
              </Box>
            </Grid>
          </Grid>
        )}
      </sections>
    </div>
  );
}
