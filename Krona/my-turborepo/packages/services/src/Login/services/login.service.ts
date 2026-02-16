import { httpClient } from "@/shared/http/httpClient";
import type { LoginRequest, LoginResponse } from "../types/login.types";

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const { data } = await httpClient.post<LoginResponse>("/auth/login", payload);

  return data;
};
