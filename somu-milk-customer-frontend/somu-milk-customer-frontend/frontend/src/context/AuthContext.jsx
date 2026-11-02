import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";
import { tokenStore } from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load: if a login token exists, ask who the user is
  useEffect(() => {
    let cancelled = false;

    authService
      .getCurrentUser()
      .then((current) => {
        if (!cancelled) setUser(current);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Server said the login expired -> log out everywhere
  useEffect(() => {
    const handleExpired = () => setUser(null);
    window.addEventListener("somu:unauthorized", handleExpired);
    return () => window.removeEventListener("somu:unauthorized", handleExpired);
  }, []);

  const login = useCallback(async (credentials, remember = true) => {
    const { token, user: loggedIn } = await authService.login(credentials);
    tokenStore.set(token, remember);
    setUser(loggedIn);
    return loggedIn;
  }, []);

  const register = useCallback(async (details) => {
    const { token, user: created } = await authService.register(details);
    tokenStore.set(token, true);
    setUser(created);
    return created;
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
  }, []);

  const saveAddress = useCallback(async (address) => {
    const updated = await authService.saveAddress(address);
    setUser(updated);
    return updated;
  }, []);

  const value = {
    user,
    loading,
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
    saveAddress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
