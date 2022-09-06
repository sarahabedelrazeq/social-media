import { Stack, Skeleton, Grid } from "@mui/material";
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
              <Box>
                <img src="/images/bg1.jpg" className="w-100" height="300" />
              </Box>
              <Box
                marginTop="-110px"
                className="d-flex justify-content-center mb-5"
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
              <Box p="12px">
                {posts
                  .filter((post) => post.id === id)
                  .map((post) => (
                    <Post {...post} user={user} />
                  ))}
              </Box>
            </Grid>
          </Grid>
        )}
      </sections>
    </div>
  );
}
