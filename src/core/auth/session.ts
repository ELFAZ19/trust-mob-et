import { secureStore } from "../storage/secureStore";
import type { AppProfile, UserRole } from "../types/domain";

const SESSION_KEY = "tamagn.session.v1";

export interface LocalSession {
  profile: AppProfile;
  accessToken: string;
}

export async function persistSession(session: LocalSession): Promise<void> {
  await secureStore.set(SESSION_KEY, JSON.stringify(session));
}

export async function readSession(): Promise<LocalSession | null> {
  const raw = await secureStore.get(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as LocalSession;
    return parsed;
  } catch {
    await secureStore.remove(SESSION_KEY);
    return null;
  }
}

export async function clearSession(): Promise<void> {
  await secureStore.remove(SESSION_KEY);
}

export function createMockProfile(role: UserRole, fullName: string): AppProfile {
  return {
    id: `${role}-${Date.now()}`,
    role,
    fullName
  };
}
