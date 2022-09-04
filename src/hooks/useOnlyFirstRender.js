import React from "react";

export default function useIsFirstRender(func) {
  const [didLoad, setDidLoad] = React.useState(false);

  React.useEffect(() => {
    if (!didLoad) {
      func();
      setDidLoad(true);
    }
  }, [didLoad]);
}
