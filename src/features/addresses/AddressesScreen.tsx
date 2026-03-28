import React, { useState } from "react";
import { Button, ScrollView, Text, TextInput } from "react-native";
import { SectionCard } from "../../components/SectionCard";

export function AddressesScreen(): JSX.Element {
  const [address, setAddress] = useState("Bole, Addis Ababa");
  const [savedAddresses, setSavedAddresses] = useState<string[]>(["Bole, Addis Ababa"]);

  function saveAddress() {
    if (!address.trim()) {
      return;
    }
    setSavedAddresses((existing) => Array.from(new Set([address.trim(), ...existing])));
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>Delivery Addresses</Text>
      <SectionCard title="Add or Update Address">
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Enter a delivery address"
          style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 }}
        />
        <Button title="Save Address" onPress={saveAddress} />
      </SectionCard>

      <SectionCard title="Saved Addresses">
        {savedAddresses.map((item) => (
          <Text key={item}>• {item}</Text>
        ))}
      </SectionCard>
    </ScrollView>
  );
}
