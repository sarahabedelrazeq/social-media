import React from "react";
import { useSearchParams } from "react-router-dom";

export default function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const handleSetPage = React.useCallback(
    async (val) => {
      setSearchParams({
        page: val,
      });
    },
    [setSearchParams]
  );

  const onPrev = () => {
    handleSetPage(page - 1);
  };

  const onNext = () => {
    handleSetPage(page + 1);
  };

  return {
    page,
    handleSetPage,
    onPrev,
    onNext,
  };
}
