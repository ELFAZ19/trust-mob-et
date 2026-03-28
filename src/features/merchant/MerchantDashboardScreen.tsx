import React from "react";
import { Text } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnScreen } from "../../components/TamagnScreen";
import { TrustBadge } from "../../components/TrustBadge";

export function MerchantDashboardScreen(): JSX.Element {
  return (
    <TamagnScreen title="Merchant Dashboard" subtitle="Sales, orders, and trust at a glance.">
      <TrustBadge label="Tamagn Verified" />

      <SectionCard title="Incoming Orders">
        <Text>Order #1008 • Awaiting confirmation</Text>
        <Text>Order #1004 • Ready for pickup</Text>
      </SectionCard>

      <SectionCard title="Actions">
        <Text>• Confirm order</Text>
        <Text>• Mark as prepared</Text>
        <Text>• Report issue to platform support</Text>
      </SectionCard>

      <SectionCard title="Performance Snapshot">
        <Text>Total sales: ETB 84,300</Text>
        <Text>Completion rate: 96%</Text>
        <Text>Average rating: 4.7</Text>
      </SectionCard>
    </TamagnScreen>
  );
}
