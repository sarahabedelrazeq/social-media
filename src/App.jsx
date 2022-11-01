import Layout from "components/Layout";
import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useLanguage } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import defTheme from "./theme";
import "./assets/styles/App.scss";
import RTL from "components/RTL";
import Auth from "components/Auth";
import Fallback from "components/Fallback";
import { client } from "helpers";
import { setUser } from "store/auth";
import { getFriend } from "store/user";

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: React.lazy(() => import("pages/Home")),
    layout: true,
    auth: true,
  },
  {
    path: "/profile/:id",
    exact: true,
    name: "Profile",
    component: React.lazy(() => import("pages/Profile")),
    layout: true,
    auth: true,
  },
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: React.lazy(() => import("pages/Auth")),
    noAuth: true,
  },
  {
    path: "/search/:search",
    exact: true,
    name: "Search",
    component: React.lazy(() => import("pages/Search")),
    layout: true,
    auth: true,
  },
];

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const language = useLanguage();
  const dispatch = useDispatch();
  const { theme } = useSelector(({ app }) => app);

  React.useLayoutEffect(() => {
    document.documentElement.setAttribute("lang", language.code);
    document.documentElement.setAttribute("dir", language.direction);
    document.documentElement.setAttribute("class", "theme-" + theme);
  }, [language, theme]);

  const darkTheme = createTheme({
    direction: language.direction,
    ...defTheme,
    palette: {
      ...defTheme.palette,
      mode: theme,
    },
  });

  const getUserData = React.useCallback(
    async (id) => {
      setLoading(true);
      let { data: userData, error } = await client
        .from("userData")
        .select(`*`)
        .eq("user_id", id);
      setLoading(false);
      if (!error) dispatch(setUser(userData[0]));
    },
    [dispatch]
  );

  React.useEffect(() => {
    const user = client.auth.user();
    if (user) {
      getUserData(user.id);
      dispatch(getFriend());
    } else dispatch(setUser({}));
  }, [dispatch, getUserData]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RTL rtl={language.code === "ar"}>
        {loading ? (
          <div className="vw-100 vh-100">
            <Fallback />
          </div>
        ) : (
          <div id="app">
            <React.Suspense
              fallback={
                <div className="vw-100 vh-100">
                  <Fallback />
                </div>
              }
            >
              <Routes>
                {routes.map((route, index) => {
                  return (
                    route.component && (
                      <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        element={
                          <Auth auth={route.auth} noAuth={route.noAuth}>
                            {route.layout ? (
                              <Layout>
                                <route.component />
                              </Layout>
                            ) : (
                              <route.component />
                            )}
                          </Auth>
                        }
                      />
                    )
                  );
                })}
              </Routes>
            </React.Suspense>
          </div>
        )}
      </RTL>
    </ThemeProvider>
  );
}
