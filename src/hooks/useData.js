import React from "react";
import useFetch from "./useFetch";
import useFilter from "./useFilter";
import usePagination from "./usePagination";

export default function useData(dataSource, filtersData, extraBody) {
  const { page, handleSetPage } = usePagination();
  const filters = useFilter(filtersData);
  const [keyword, setKeyword] = React.useState("");
  const [response, fetchRequest] = useFetch(dataSource, "POST");
  const body = React.useRef(extraBody);

  const search = (value) => {
    handleSetPage(1);
    setKeyword(value);
  };

  const handleFilterize = React.useCallback(
    (body) => {
      let filtersObj = {};
      filters.selectedFilters.forEach((sf1) => {
        filtersObj[sf1.key] = filters.selectedFilters
          .filter((sf2) => sf1.key === sf2.key)
          .map((sf2) => sf2.values)[0];
      });

      fetchRequest(
        {
          filters: filtersObj,
          search_key: keyword,
          ...body,
        },
        `?page=${page}`
      );
    },
    [fetchRequest, filters.selectedFilters, keyword, page]
  );

  React.useEffect(() => {
    handleFilterize(body.current);
  }, [handleFilterize, filters.selectedFilters, keyword, page, body]);

  return { response, filters, search };
}
