import { Stack, Skeleton, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import posts from "data/posts.json";
import React, { useState } from "react";
import users from "data/users.json";
import Post from "components/Post";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const user = users.filter((user) => user.id === id)[0];

  setTimeout(() => {
    setLoading(false);
  }, [3000]);

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
                {posts
                  .filter((post) => post.id === id)
                  .map((post, index) => (
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
