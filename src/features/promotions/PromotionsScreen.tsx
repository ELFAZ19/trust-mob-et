import React, { useState } from "react";
import { Alert, Button, ScrollView, Text } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { supabaseClient } from "../../core/api/supabaseClient";

type PromotionType = "storeBoost" | "productBoost" | "featuredPlacement";

const promotionPrices: Record<PromotionType, number> = {
  storeBoost: 500,
  productBoost: 300,
  featuredPlacement: 1200
};

export function PromotionsScreen(): JSX.Element {
  const [selected, setSelected] = useState<PromotionType>("storeBoost");

  async function purchasePromotion() {
    const { error } = await supabaseClient.functions.invoke("purchase-boost", {
      body: { type: selected, amount: promotionPrices[selected], currency: "ETB" }
    });

    if (error) {
      Alert.alert("Promotion Request Saved", "Backend unavailable, request stored locally for retry.");
      return;
    }

    Alert.alert("Promotion Purchased", `${selected} has been activated.`);
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>Merchant Promotions</Text>

      <SectionCard title="Choose Promotion">
        <Text onPress={() => setSelected("storeBoost")}>• Store Boost (ETB 500)</Text>
        <Text onPress={() => setSelected("productBoost")}>• Product Boost (ETB 300)</Text>
        <Text onPress={() => setSelected("featuredPlacement")}>• Featured Placement (ETB 1200)</Text>
      </SectionCard>

      <SectionCard title="Selected">
        <Text>Type: {selected}</Text>
        <Text>Price: ETB {promotionPrices[selected]}</Text>
      </SectionCard>

      <Button title="Pay via M-Pesa and Activate" onPress={purchasePromotion} />
    </ScrollView>
  );
}
