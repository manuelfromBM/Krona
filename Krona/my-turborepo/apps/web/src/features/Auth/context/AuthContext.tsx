"use client"

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { AuthResponse } from "@packages/services";

type User = AuthResponse["user"];

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: () => {},
  clearAuth: () => {},
});

const STORAGE_KEY = "auth";

function readStorage(): { user: User; token: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { user: User; token: string };
    if (parsed.user && parsed.token) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = readStorage();
    if (stored) {
      setUser(stored.user);
      setToken(stored.token);
    }
  }, []);

  const setAuth = useCallback((newUser: User, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: newUser, token: newToken }));
  }, []);

  const clearAuth = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, token, isAuthenticated: !!token, setAuth, clearAuth }),
    [user, token, setAuth, clearAuth]
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
