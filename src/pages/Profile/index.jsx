import { Skeleton, Grid, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import Post from "components/Post";
import { useParams } from "react-router-dom";
import { client } from "helpers";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

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
    let { data: userData } = await client
      .from("userData")
      .select(`*`)
      .eq("id", id);
    setLoading(false);
    if (userData && userData.length > 0) setUser(userData[0]);
  }, []);

  React.useEffect(() => {
    if (id) {
      getUserData(id);
      getPosts(id);
    }
  }, [getUserData, getPosts, id]);

  return (
    <div id="profile-page" className="page-container">
      <sections>

      </sections>
    </div>
  );
}
