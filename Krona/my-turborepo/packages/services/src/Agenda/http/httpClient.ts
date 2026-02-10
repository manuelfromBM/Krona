import axios from "axios"; //pnpm add axios -w

export const httpClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
});
console.log("API_URL:", process.env.API_URL);
