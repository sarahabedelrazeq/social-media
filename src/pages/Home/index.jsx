import { Box, Stack, Skeleton } from "@mui/material";
import Post from "components/Post";
import React, { useState } from "react";
import posts from "data/posts.json";
import users from "data/users.json";
import { async } from "rxjs";
import { client } from "helpers";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getPosts = React.useCallback(async () => {
    setLoading(true)
    let { data: posts, error } = await client.from("posts").select(`*, userData(*)`)
    setLoading(false)
    if (!error) setPosts(posts);
  }, []);

  React.useEffect(() => {
    getPosts();
  }, [getPosts]);

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
        <Box>
          {posts.map((post, index) => (
            <Post
              {...post}
              user={post?.userData}
              key={index}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default Home;
