import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { supabaseClient } from "../api/supabaseClient";
import { clearSession, createMockProfile, persistSession, readSession } from "./session";
import type { AppProfile, UserRole } from "../types/domain";

interface AuthState {
  isBooting: boolean;
  profile: AppProfile | null;
  signInWithRole: (role: UserRole, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren): JSX.Element {
  const [isBooting, setIsBooting] = useState(true);
  const [profile, setProfile] = useState<AppProfile | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const local = await readSession();
        if (local) {
          setProfile(local.profile);
        }
      } catch {
        // SecureStore may fail on web -- handled gracefully
      }
      setIsBooting(false);
    })();
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      isBooting,
      profile,
      async signInWithRole(role, fullName) {
        const generatedProfile = createMockProfile(role, fullName);
        const session = { accessToken: `local-${Date.now()}`, profile: generatedProfile };
        await persistSession(session);
        setProfile(generatedProfile);
      },
      async signOut() {
        await clearSession();
        try {
          await supabaseClient.auth.signOut();
        } catch {
          // offline-safe
        }
        setProfile(null);
      }
    }),
    [isBooting, profile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
