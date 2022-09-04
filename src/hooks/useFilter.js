import React from "react";

export default function useFilter(initialState) {
  const [appliedFilters, setAppliedFilters] = React.useState(initialState);
  const [selectedFilters, setSelectedFilters] = React.useState(initialState);

  function filterExists(group, value) {
    if (Array.isArray(selectedFilters[group]))
      return selectedFilters[group].findIndex((item) => item === value) >= 0;
    if (typeof selectedFilters[group] === "object")
      return selectedFilters[group] !== null;
    if (typeof selectedFilters[group] === "string")
      return selectedFilters[group] !== "";
    if (typeof selectedFilters[group] === "boolean")
      return selectedFilters[group] === true;
  }

  function addFilter(group, value) {
    if (Array.isArray(selectedFilters[group]))
      return setSelectedFilters((currentFilters) => {
        return {
          ...currentFilters,
          [group]: [...currentFilters[group], value],
        };
      });
    if (typeof selectedFilters[group] === "object")
      return setSelectedFilters((currentFilters) => {
        return {
          ...currentFilters,
          [group]: value,
        };
      });
    if (
      typeof selectedFilters[group] === "string" ||
      typeof selectedFilters[group] === "number"
    )
      return setSelectedFilters((currentFilters) => {
        return {
          ...currentFilters,
          [group]: value,
        };
      });
    if (typeof selectedFilters[group] === "boolean")
      return setSelectedFilters((currentFilters) => {
        return {
          ...currentFilters,
          [group]: true,
        };
      });
  }

  function removeFilter(group, value) {
    if (Array.isArray(selectedFilters[group]))
      return setSelectedFilters((currentFilters) => {
        return {
          ...currentFilters,
          [group]: [...currentFilters[group].filter((item) => item !== value)],
        };
      });
    if (typeof selectedFilters[group] === "object")
      return setSelectedFilters((currentFilters) => {
        return {
          ...currentFilters,
          [group]: initialState[group],
        };
      });
    if (typeof selectedFilters[group] === "string")
      return setSelectedFilters((currentFilters) => {
        return {
          ...currentFilters,
          [group]: "",
        };
      });
    if (typeof selectedFilters[group] === "boolean")
      return setSelectedFilters((currentFilters) => {
        return {
          ...currentFilters,
          [group]: false,
        };
      });
  }

  function toggleFilter(group, value, toggle = true) {
    // WHEN TOGGLE = FALSE, should remove filter and add it directly again
    if (toggle) {
      if (filterExists(group, value)) {
        removeFilter.apply(null, arguments);
      } else {
        addFilter.apply(null, arguments);
      }
    } else {
      if (filterExists(group, value)) {
        removeFilter.apply(null, arguments);
        addFilter.apply(null, arguments);
      } else {
        addFilter.apply(null, arguments);
      }
    }
  }

  function applyFilters() {
    setAppliedFilters(selectedFilters);
  }

  function resetFilters() {
    setAppliedFilters(initialState);
    setSelectedFilters(initialState);
  }

  return {
    applyFilters,
    appliedFilters,
    selectedFilters,
    addFilter,
    removeFilter,
    toggleFilter,
    resetFilters,
  };
}
