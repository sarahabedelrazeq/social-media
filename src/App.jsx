// import Layout from "components/Layout";
// import React from "react";
// import { createTheme, ThemeProvider } from "@mui/material";
// import { Route, Routes } from "react-router-dom";
// import { useLanguage } from "hooks";
// import { useSelector } from "react-redux";
// import defTheme from "./theme";
// import "./assets/styles/App.scss";
// import RTL from "components/RTL";
// import Auth from "components/Auth";
// import Fallback from "components/Fallback";

// const routes = [
//   {
//     path: "/",
//     exact: true,
//     name: "Home",
//     component: React.lazy(() => import("pages/Home")),
//     layout: true,
//     auth: true,
//   },
//   {
//     path: "/profile/:id",
//     exact: true,
//     name: "Profile",
//     component: React.lazy(() => import("pages/Profile")),
//     layout: true,
//     auth: true,
//   },
//   {
//     path: "/login",
//     exact: true,
//     name: "Login",
//     component: React.lazy(() => import("pages/Auth")),
//     noAuth: true,

//   },
// ];

// export default function App() {
//   const language = useLanguage();
//   const { color, theme } = useSelector(({ app }) => app);

//   React.useLayoutEffect(() => {
//     document.documentElement.setAttribute("lang", language.code);
//     document.documentElement.setAttribute("dir", language.direction);
//     document.documentElement.setAttribute("class", "theme-" + theme);
//     document.querySelector(":root").style.setProperty("--color", color);
//   }, [language, theme, color]);

//   const darkTheme = createTheme({
//     direction: language.direction,
//     ...defTheme,
//     palette: {
//       ...defTheme.palette,
//       mode: theme,
//     },
//   });

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <RTL rtl={language.code === "ar"}>
//         <div id="app">
//           <React.Suspense
//             fallback={
//               <div className="vw-100 vh-100">
//                 <Fallback />
//               </div>
//             }
//           >
//             <Routes basename="/">
//               {routes.map((route, index) => {
//                 return (
//                   route.component && (
//                     <Route
//                       key={index}
//                       path={route.path}
//                       exact={route.exact}
//                       name={route.name}
//                       element={
//                         <Auth auth={route.auth} noAuth={route.noAuth} >
//                           {route.layout ? (
//                             <Layout>
//                               <route.component />
//                             </Layout>
//                           ) : (
//                             <route.component />
//                           )}
//                         </Auth>
//                       }
//                     />
//                   )
//                 );
//               })}
//             </Routes>
//           </React.Suspense>
//         </div>
//       </RTL>
//     </ThemeProvider>
//   );
// }
import React, { useState } from "react";

function GoogleDriveFileUploader() {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file.data);
    const response = await fetch(
      "http://localhost:5001/upload-to-google-drive",
      {
        method: "POST",
        body: formData,
      }
    );

    const responseWithBody = await response.json();
    if (response) setUrl(responseWithBody.publicUrl);
  };

  const handleFileChange = (e) => {
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(file);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" onChange={handleFileChange}></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default GoogleDriveFileUploader;
