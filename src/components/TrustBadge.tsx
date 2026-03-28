import React from "react";
import { Text, View } from "react-native";
import { tamagnColors } from "../core/theme/tokens";

interface TrustBadgeProps {
  score?: number;
  tier?: "Gold" | "Silver" | "Bronze";
  label?: string;
  size?: "sm" | "md";
}

const tierColors = {
  Gold: { bg: "#FFF8E1", text: "#7B6100", icon: "★" },
  Silver: { bg: "#F5F5F5", text: "#616161", icon: "★" },
  Bronze: { bg: "#FFF3E0", text: "#8D5100", icon: "★" },
};

export function TrustBadge({ score, tier = "Bronze", label, size = "sm" }: TrustBadgeProps): JSX.Element {
  const t = tierColors[tier];
  const displayLabel = label ?? `${tier} Merchant`;
  const isMd = size === "md";

  return (
    <View
      style={{
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: tier === "Gold" ? tamagnColors.primaryFixed : t.bg,
        borderRadius: 999,
        paddingHorizontal: isMd ? 12 : 8,
        paddingVertical: isMd ? 6 : 3,
      }}
    >
      <Text style={{ fontSize: isMd ? 13 : 10 }}>{t.icon}</Text>
      <Text style={{ color: tier === "Gold" ? "#015300" : t.text, fontSize: isMd ? 12 : 10, fontWeight: "700" }}>
        {displayLabel}
      </Text>
      {score != null ? (
        <Text style={{ color: tier === "Gold" ? "#015300" : t.text, fontSize: isMd ? 12 : 10, fontWeight: "800" }}>
          {" "}{score}
        </Text>
      ) : null}
    </View>
  );
}
