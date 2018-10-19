import axios from "axios";
import queryString from "query-string";
import { Security } from "support/utils";

const config = () => ({
  headers: {
    "x-auth-token": localStorage.getItem("rk")
  }
});

export const get = (url, data) =>
  axios.get(`${url}?${queryString.stringify(Security.encG(data))}`, config());

export const post = (url, data) =>
  axios.post(url, Security.encP(data), config());

export const patch = (url, data) =>
  axios.patch(url, Security.encG(data), config());

export const del = (url, data) =>
  axios.delete(url, { headers: config().headers, data: Security.encG(data) });
