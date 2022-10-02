import Fallback from "components/Fallback";
import { navigate } from "helpers";
import supabase from "helpers/client";
import React from "react";
import { Navigate } from "react-router-dom";

export default function Auth({ children, auth, noAuth }) {
  const [userId, setUserId] = React.useState(null);
  const user = supabase.auth.user();

  React.useEffect(() => {
    console.log("user", user);
    if (user && user.id) {
      setUserId(user.id);
      if (noAuth) navigate("/");
    } else {
      setUserId("");
    }
  }, [user, noAuth]);

  if (userId === null)
    return (
      <div className="vw-100 vh-100">
        <Fallback />
      </div>
    );

  if (auth && userId === "") return <Navigate to="/login" />;

  return <div>{children}</div>;
}
