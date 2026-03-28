import React from "react";
import { Text } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnButton } from "../../components/TamagnButton";
import { TamagnScreen } from "../../components/TamagnScreen";
import { useAuth } from "../../core/auth/AuthContext";

export function HomeScreen(): JSX.Element {
  const { profile, signOut } = useAuth();

  return (
    <TamagnScreen title="ታማኝ" subtitle="The Digital Guardian for hyperlocal commerce.">
      <SectionCard title="Signed In User">
        <Text>Name: {profile?.fullName}</Text>
        <Text>Role: {profile?.role}</Text>
      </SectionCard>

      <SectionCard title="MVP Modules Available">
        <Text>Buyer: discovery, orders, escrow, tracking, reviews</Text>
        <Text>Merchant: catalog, dashboard, analytics</Text>
        <Text>Service provider: services and request handling base</Text>
      </SectionCard>

      <TamagnButton title="Sign Out" onPress={signOut} />
    </TamagnScreen>
  );
}
