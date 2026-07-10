// Skedaddle Franchise Portal — Auth Context
// Simple password-based login protection for the portal.
// In production, replace with proper OAuth or Manus auth.
// Credentials are stored in sessionStorage (cleared on tab close).

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AuthUser {
  username: string;
  role: "admin" | "franchise";
  locationId?: string; // if franchise role, which location they can see
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

// Demo credentials — replace with real auth in production
// Admin can see all locations; franchise users see only their own
const DEMO_CREDENTIALS: Record<string, { password: string; user: AuthUser }> = {
  admin: {
    password: "skedaddle2026",
    user: { username: "admin", role: "admin" },
  },
  milwaukee: {
    password: "milw2026",
    user: { username: "milwaukee", role: "franchise", locationId: "milwaukee" },
  },
  madison: {
    password: "madi2026",
    user: { username: "madison", role: "franchise", locationId: "madison" },
  },
  ottawa: {
    password: "otta2026",
    user: { username: "ottawa", role: "franchise", locationId: "ottawa" },
  },
  toronto: {
    password: "toro2026",
    user: { username: "toronto", role: "franchise", locationId: "toronto" },
  },
  minneapolis: {
    password: "minn2026",
    user: { username: "minneapolis", role: "franchise", locationId: "minneapolis" },
  },
  "north-atlanta": {
    password: "atla2026",
    user: { username: "north-atlanta", role: "franchise", locationId: "north-atlanta" },
  },
};

const SESSION_KEY = "skedaddle_portal_user";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((username: string, password: string): { success: boolean; error?: string } => {
    const entry = DEMO_CREDENTIALS[username.toLowerCase().trim()];
    if (!entry) {
      return { success: false, error: "Username not found." };
    }
    if (entry.password !== password) {
      return { success: false, error: "Incorrect password." };
    }
    setUser(entry.user);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(entry.user));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  // Sync across tabs (optional — sessionStorage is tab-scoped by default)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === SESSION_KEY && !e.newValue) {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
