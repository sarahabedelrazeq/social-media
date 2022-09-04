import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import useLanguage from "./useLanguage";

const useUpload = (
  options = {
    endpoint: "",
    nullifyOnRecall: false,
    initialLoadingState: false,
  }
) => {
  const { endpoint, nullifyOnRecall, initialLoadingState } = options;
  const translation = useLanguage();
  const { guestId, accessToken } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(initialLoadingState);

  const request = useCallback(
    ({ body = null, onSuccess = null, onError = null }) => {
      setLoading(true);
      if (nullifyOnRecall) {
        setData(null);
      }

      setError(null);
      let dataToSend = body;
      dataToSend = new FormData();
      dataToSend.append("file", body.file);

      return axios
        .request({
          method: "POST",
          baseURL: "",
          url: `${endpoint}`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/form-data",
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
          ...(body && {
            data: dataToSend,
          }),
        })
        .then((response) => {
          setData(response.data.data);
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
    },
    [endpoint, guestId, accessToken, nullifyOnRecall, translation.code]
  );

  return [{ data, error, loading }, request];
};

export default useUpload;
