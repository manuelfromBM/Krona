import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useUser() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useUser debe usarse dentro de un AuthProvider");
  }
  return ctx;
}
