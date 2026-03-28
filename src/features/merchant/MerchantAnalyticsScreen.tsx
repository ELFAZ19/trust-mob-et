import React from "react";
import { ScrollView, Text } from "react-native";
import { SectionCard } from "../../components/SectionCard";

export function MerchantAnalyticsScreen(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>Merchant Analytics</Text>

      <SectionCard title="Sales Overview">
        <Text>This month sales: ETB 128,500</Text>
        <Text>Orders completed: 214</Text>
      </SectionCard>

      <SectionCard title="Top Products">
        <Text>1. Fresh Injera Pack</Text>
        <Text>2. Berbere Spice Mix</Text>
        <Text>3. Roasted Coffee Bundle</Text>
      </SectionCard>

      <SectionCard title="Customer Feedback">
        <Text>Positive feedback ratio: 92%</Text>
        <Text>Average response time: 12 minutes</Text>
      </SectionCard>
    </ScrollView>
  );
}
