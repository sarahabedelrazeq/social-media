import React from "react";

export default function useSkipFirstRender(func, deps) {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      func();
    }
  }, deps);

  React.useEffect(() => {
    isMounted.current = true;
  }, []);
}
