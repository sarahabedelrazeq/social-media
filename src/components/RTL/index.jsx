import React from "react";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function RTL({ children, rtl }) {
  return (
    <>
      {rtl && <CacheProvider value={cacheRtl}>{children}</CacheProvider>}
      {!rtl && <>{children}</>}
    </>
  );
}
