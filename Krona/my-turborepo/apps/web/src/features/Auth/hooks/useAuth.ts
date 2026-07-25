import { useState } from "react";
import { authService, type LoginDTO, type AuthResponse } from "@packages/services";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginDTO): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.iniciosesion(data);
      // TODO: persistir token (localStorage, cookie, context, etc.)  
      return response;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Error al iniciar sesion";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
