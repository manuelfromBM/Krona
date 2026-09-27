// import axios from "axios";
// import { env } from "../config/env";

// export const httpClient = axios.create({
//   baseURL: env.apiUrl,
//   timeout: 10000,
// });

import { env } from "../config/env";

interface HttpOptions extends RequestInit {
  token?: string;
}

export async function httpClient<T>(endpoint: string,options: HttpOptions = {}): Promise<T> {
  
  const { token, ...fetchOptions } = options;

  const response = await fetch(`${env.apiUrl}${endpoint}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error en la petición");
  }

  return response.json();
}
