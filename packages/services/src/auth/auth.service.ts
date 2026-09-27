import { httpClient } from "../shared/http/httpClient";
import { AUTH_ENDPOINTS } from "./auth.endpoints";
import { LoginDTO, RegistroDTO, AuthResponse, RecuperarContrasena } from "./auth.types";

export const authService = {
  iniciosesion: (data: LoginDTO) =>
    httpClient<AuthResponse>(AUTH_ENDPOINTS.inicioSesion, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  registro: (data: RegistroDTO) =>
    httpClient<AuthResponse>(AUTH_ENDPOINTS.registro, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  refresh: (refreshToken: string) =>
    httpClient<AuthResponse>(AUTH_ENDPOINTS.refresh, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),

  me: (token: string) =>
    httpClient<AuthResponse["user"]>(AUTH_ENDPOINTS.me, {
      method: "GET",
      token,
    }),

  recuperarContrasena: (data: RecuperarContrasena) => 
    httpClient<AuthResponse>(AUTH_ENDPOINTS.recuperarContrasena, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};