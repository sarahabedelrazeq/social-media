import { Box, Stack, Skeleton } from "@mui/material";
import { client } from "helpers";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const { search } = useParams();

  const getUserData = React.useCallback(
    async (search) => {
      setLoading(true);
      let { data: userData, error } = await client
        .from("userData")
        .select(`*`)
        .ilike("name", `%${search}%`)
        .limit(10);

      setLoading(false);
      if (!error) dispatch(setUsers(userData));
    },
    [dispatch]
  );

  React.useEffect(() => {
    getUserData(search);
  }, [dispatch, getUserData, search]);

  return (
    <div>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={100} />
        </Stack>
      ) : (
        <Box>
          {users.map(({ image, name, id }, index) => (
            <div className="d-flex gap-3 mb-3 align-items-center">
              <div>
                <img src={image} alt={name} width={100} />
              </div>
              <div>
                <Link to={`/profile/${id}`}>{name}</Link>
              </div>
            </div>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Search;
