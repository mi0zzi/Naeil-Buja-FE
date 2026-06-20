import axios from "axios";

export const api = axios.create({
  baseURL: "https://untwist-malformed-cause.ngrok-free.dev",
  headers: {
    "Content-Type": "application/json",
  },
});
