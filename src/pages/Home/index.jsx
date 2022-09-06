import { Box, Stack, Skeleton } from "@mui/material";
import Post from "components/Post";
import React, { useState } from "react";
import posts from "data/posts.json";
import users from "data/users.json";

const Home = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  return (
    <div>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <Box p="12px">
          {posts.map((post) => (
            <Post
              {...post}
              user={users.filter((user) => user.id === post.user_id)[0]}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default Home;
