import axios from "axios";

const isServer = typeof window === "undefined";

const serverBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const appHttpClient = axios.create({
  baseURL: isServer ? serverBaseUrl : "",
  headers: {
    "Content-Type": "application/json",
  },
});

export const upstreamHttpClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});