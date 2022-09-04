import React from "react";
import useLanguage from "./useLanguage";

function useLanguageEffect(func, deps) {
  const language = useLanguage();

  React.useEffect(() => {
    func();
  }, [language, ...deps]);
}

export default useLanguageEffect;
