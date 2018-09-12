import axios from "axios";
import queryString from "query-string";
import { Security } from "support/utils";

export const get = (url, data) =>
  axios.get(`${url}?${queryString.stringify(Security.encG(data))}`);

export const post = (url, data) => axios.post(url, Security.encP(data));

export const put = (url, data) => axios.put(url, Security.encP(data));

export const del = (url, data) => axios.delete(url, Security.encP(data));
