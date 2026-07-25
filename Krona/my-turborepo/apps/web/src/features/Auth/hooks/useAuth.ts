import { useCallback, useContext, useState } from "react";
import { authService, type LoginDTO } from "@packages/services";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useContext(AuthContext);

  const login = useCallback(async (data: LoginDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.iniciosesion(data);
      setAuth(response.user, response.access_token);
      return response;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Error al iniciar sesion";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setAuth]);

  return { login, loading, error };
}
