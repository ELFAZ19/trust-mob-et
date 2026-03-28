import React, { useState } from "react";
import { Button, ScrollView, Text, TextInput } from "react-native";
import { SectionCard } from "../../components/SectionCard";

export function ServiceProviderScreen(): JSX.Element {
  const [serviceName, setServiceName] = useState("Electrical Repair");
  const [serviceArea, setServiceArea] = useState("Bole, Kazanchis, Megenagna");
  const [priceRange, setPriceRange] = useState("ETB 500 - 1800");
  const [listings, setListings] = useState<string[]>([]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>Service Provider</Text>

      <SectionCard title="Service Listing">
        <TextInput
          value={serviceName}
          onChangeText={setServiceName}
          placeholder="Service name"
          style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}
        />
        <TextInput
          value={serviceArea}
          onChangeText={setServiceArea}
          placeholder="Service areas"
          style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}
        />
        <TextInput
          value={priceRange}
          onChangeText={setPriceRange}
          placeholder="Price range"
          style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}
        />
        <Button
          title="Publish Service"
          onPress={() => setListings((existing) => [`${serviceName} • ${serviceArea} • ${priceRange}`, ...existing])}
        />
      </SectionCard>

      <SectionCard title="Published Services">
        {listings.length === 0 ? <Text>No published services yet.</Text> : null}
        {listings.map((item) => (
          <Text key={item}>• {item}</Text>
        ))}
      </SectionCard>
    </ScrollView>
  );
}
