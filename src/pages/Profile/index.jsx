import { Stack, Skeleton, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import users from "data/users.json";
import Post from "components/Post";
import { useParams } from "react-router-dom";
import { client } from "helpers";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  const getPosts = React.useCallback(async (id) => {
    setLoading(true);
    let { data: posts, error } = await client
      .from("posts")
      .select(`*`)
      .eq("user_id", id);

    setLoading(false);
    if (!error) setPosts(posts);
  }, []);

  const getUserData = React.useCallback(async (id) => {
    setLoading(true);
    let { data: userData, error } = await client
      .from("userData")
      .select(`*`)
      .eq("id", id);
    setLoading(false);
    if (!error) setUser(userData[0]);

    getPosts(userData[0]?.id);
  }, []);

  React.useEffect(() => {
    getUserData(id);
    getPosts(id);
  }, [getUserData, getPosts]);

  return (
    <div id="profile-page" className="page-container">
      <sections>
        {loading ? (
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
                <img src="/images/bg1.jpg" className="w-100" height="300" />
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
                    width="200"
                    height="200"
                    className="rounded-circle"
                  />
                </Box>
              </Box>
              <Box className="mb-5">
                <Typography variant="h5" component="h2" className="text-center">
                  {user.name}
                </Typography>
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
