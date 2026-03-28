import React from "react";
import type { PropsWithChildren } from "react";
import { Text, View } from "react-native";
import { useAuth } from "../auth/AuthContext";
import type { UserRole } from "../types/domain";

interface RoleGateProps {
  allowedRoles: UserRole[];
}

export function RoleGate({ allowedRoles, children }: PropsWithChildren<RoleGateProps>): JSX.Element {
  const { profile } = useAuth();
  const hasAccess = Boolean(profile && allowedRoles.includes(profile.role));

  if (!hasAccess) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Access Restricted</Text>
        <Text>This section is available for: {allowedRoles.join(", ")}</Text>
      </View>
    );
  }

  return <>{children}</>;
}
