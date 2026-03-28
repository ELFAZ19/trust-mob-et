import React from "react";
import { ScrollView, Text } from "react-native";
import { SectionCard } from "../../components/SectionCard";

export function TrustScoreScreen(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>Trust and Reputation</Text>

      <SectionCard title="Merchant Trust Score" subtitle="Computed from ratings, completion, complaints">
        <Text>Trust score: 91 / 100</Text>
        <Text>Completion rate: 96%</Text>
        <Text>Average rating: 4.7</Text>
        <Text>Complaint rate: 1.2%</Text>
      </SectionCard>

      <SectionCard title="Ranking Impact">
        <Text>Higher trust score increases search ranking and recommendation priority.</Text>
      </SectionCard>
    </ScrollView>
  );
}
