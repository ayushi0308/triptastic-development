import axios from "axios";
import * as Constants from "../constants";

const LocalApi = () => {
  const instance = axios.create({
    baseURL: Constants.BASE_URL,
  });

  const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };

  instance.interceptors.request.use(function (config) {
    const token = getAccessToken();
    console.log(token);
    if (token) {
      config.headers["x-access-token"] = token;
    }

    return config;
  });

  return instance;
};

export default LocalApi();
