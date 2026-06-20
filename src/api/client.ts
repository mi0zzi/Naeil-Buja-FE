import axios from "axios";

export const api = axios.create({
  baseURL: "https://stucco-pavilion-pony.ngrok-free.dev",
  headers: {
    "Content-Type": "application/json",
  },
});
