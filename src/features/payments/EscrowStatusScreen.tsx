import React from "react";
import { ScrollView, Text } from "react-native";
import { SectionCard } from "../../components/SectionCard";

export function EscrowStatusScreen(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>Escrow Status</Text>

      <SectionCard title="Current Escrow Lifecycle">
        <Text>1. Buyer pays via M-Pesa to platform escrow.</Text>
        <Text>2. Funds remain held while delivery completes.</Text>
        <Text>3. Buyer confirms delivery, then release triggers.</Text>
        <Text>4. If dispute is opened, funds stay locked for admin resolution.</Text>
      </SectionCard>

      <SectionCard title="Sample Transaction" subtitle="Order: demo-order">
        <Text>State: HELD</Text>
        <Text>Amount: ETB 760</Text>
        <Text>Updated by backend event: update-escrow-status</Text>
      </SectionCard>
    </ScrollView>
  );
}
