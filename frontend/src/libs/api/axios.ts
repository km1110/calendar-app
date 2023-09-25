import axios from "axios";

axios.defaults.withCredentials = true;

export const client = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    // "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});
