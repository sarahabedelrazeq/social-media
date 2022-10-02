import Fallback from "components/Fallback";
import supabase from "helpers/client";
import React from "react";
import { Navigate } from "react-router-dom";

export default function Auth({ children, auth }) {
  const [userId, setUserId] = React.useState(null);

  React.useEffect(() => {
    const user = supabase.auth.user();
    if (user && user.id) setUserId(user.id);
    else setUserId("");
  }, []);

  if (userId === null)
    return (
      <div className="vw-100 vh-100">
        <Fallback />
      </div>
    );

  if (auth && userId === "") return <Navigate to="/login" />;

  return <div>{children}</div>;
}
