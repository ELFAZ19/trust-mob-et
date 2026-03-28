import React from "react";
import { Text, View } from "react-native";
import { tamagnColors } from "../core/theme/tokens";

interface TrustBadgeProps {
  label?: string;
}

export function TrustBadge({ label = "Verified Merchant" }: TrustBadgeProps): JSX.Element {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: tamagnColors.primaryFixed,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 5
      }}
    >
      <Text style={{ color: "#015300", fontSize: 11, fontWeight: "800", letterSpacing: 0.4 }}>{label}</Text>
    </View>
  );
}
