import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

/**
 * @typedef { import("../../@types/index").ApplicationResponse } ApplicationResponse
 */

/**
 * 
 * @returns {import("axios").AxiosPromise<ApplicationResponse>}
 * 
 */
export function getApplications() {
  return api.get("/applications")
}

export { api }