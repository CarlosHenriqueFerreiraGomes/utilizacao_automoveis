import { LoadEnv } from "./LoadEnv";
import { AxiosRequestConfig } from "axios";
const { REDIRECTION_URI, TIMEOUT, MAX_REDIRECTS } = LoadEnv.instance.env;
export const apiConfig: AxiosRequestConfig = {
  withCredentials: true,
  timeout: Number(TIMEOUT),
  baseURL: REDIRECTION_URI,
  maxRedirects: Number(MAX_REDIRECTS),
  maxBodyLength: Infinity,
  maxContentLength: Infinity
};
