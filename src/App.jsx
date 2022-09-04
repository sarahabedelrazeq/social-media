import Layout from "components/Layout";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useLanguage } from "hooks";
import { useSelector } from "react-redux";
import defTheme from "./theme";
import "./assets/styles/App.scss";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: React.lazy(() => import("pages/Home")),
    layout: true,
  },
];

export default function App() {
  const language = useLanguage();
  const { color, theme } = useSelector(({ app }) => app);

  React.useLayoutEffect(() => {
    document.documentElement.setAttribute("lang", language.code);
    document.documentElement.setAttribute("dir", language.direction);
    document.documentElement.setAttribute("class", "theme-" + theme);
    document.querySelector(":root").style.setProperty("--color", color);
  }, [language, theme, color]);

  const darkTheme = createTheme({
    direction: language.direction,
    ...defTheme,
    palette: {
      ...defTheme.palette,
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <RTL>
        <div id="app">
          <React.Suspense fallback={<React.Fragment></React.Fragment>}>
            <Routes basename="/">
              {routes.map((route, idx) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={
                        route.layout ? (
                          <Layout>
                            <route.component />
                          </Layout>
                        ) : (
                          <route.component />
                        )
                      }
                    />
                  )
                );
              })}
            </Routes>
          </React.Suspense>
        </div>
      </RTL>
    </ThemeProvider>
  );
}
