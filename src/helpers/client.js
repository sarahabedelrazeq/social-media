import axios from "axios";
import { DEFAULT_LANGUAGE } from "constants";

const client = () => {
  return axios.create({
    baseURL: "",
    responseType: "json",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      Language: DEFAULT_LANGUAGE,
      Token: "",
    },
  });
};

export default client;
