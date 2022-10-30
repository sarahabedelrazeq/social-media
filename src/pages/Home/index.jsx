import { Box, Stack, Skeleton } from "@mui/material";
import Post from "components/Post";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "store/user";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, feed } = useSelector(({ user }) => user);

  React.useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

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
          {feed.map((post, index) => (
            <Post {...post} user={post?.userData} key={index} />
          ))}
        </Box>
      )}
    </div>
  );
};

export default Home;
