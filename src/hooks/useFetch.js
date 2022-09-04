import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import useLanguage from "./useLanguage";
import useSkipFirstRender from "./useSkipFirstRender";
import { useOnlyFirstRender } from "hooks";

/**
 *
 * ========= USAGE =========
 *
 * In your component
 * const [response, request] = useFetch({endpoint: '/getPublicPages'},
 * [your-dependency-array],
 * true/false)
 * if immediate = true, then the request will be immediately executed without invoking it
 * if immediate = false, then the request won't be executed until you call it with request()
 */

const useFetch = (
  options = {
    endpoint: "",
    method: "GET",
    body: null,
    params: null,
    onSuccess: null,
    onError: null,
    nullifyOnRecall: false,
    initialLoadingState: false,
  },
  deps = [],
  immediate = true
) => {
  const {
    endpoint,
    method,
    body,
    params,
    onSuccess,
    onError,
    nullifyOnRecall,
    initialLoadingState,
  } = options;
  const translation = useLanguage();
  const { guestId, accessToken } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(initialLoadingState);

  const request = useCallback(() => {
    setLoading(true);
    if (nullifyOnRecall) {
      setData(null);
    }
    setError(null);
    return axios
      .request({
        method,
        baseURL: "",
        url: `${endpoint}${params ? params : ""}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          token: "",
          language: translation.code,
          ...(accessToken &&
            accessToken !== "" &&
            accessToken.length > 15 && {
              Authorization: `Bearer ${accessToken}`,
            }),
          ...(guestId &&
            guestId !== "" && {
              guestid: guestId,
            }),
        },
        ...(method === "POST" &&
          body && {
            data: body,
          }),
      })
      .then((response) => {
        setData(response.data.data);
        setMeta(response.data.meta);
        if (response.data.data && onSuccess) {
          return onSuccess(response.data, response.data.message);
        }
        if (onError) {
          onError(response.data.message?.errors);
        }
      })
      .catch((err) => {
        let error = err.response.data.errors
          ? err.response.data.errors
          : err.response.data.message;
        setError(error);
        if (onError) {
          onError(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    method,
    endpoint,
    guestId,
    accessToken,
    body,
    params,
    onSuccess,
    onError,
    nullifyOnRecall,
    translation.code,
  ]);

  useOnlyFirstRender(() => {
    if (immediate) {
      request();
    }
  });

  useSkipFirstRender(() => request(), [...deps]);

  return [{ data, meta, error, loading }, request];
};

export default useFetch;
