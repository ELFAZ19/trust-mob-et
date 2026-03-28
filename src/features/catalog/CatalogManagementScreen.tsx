import React, { useState } from "react";
import { Button, ScrollView, Text, TextInput } from "react-native";
import { SectionCard } from "../../components/SectionCard";

interface ProductDraft {
  name: string;
  price: string;
  inventory: string;
}

export function CatalogManagementScreen(): JSX.Element {
  const [draft, setDraft] = useState<ProductDraft>({
    name: "Special Coffee Beans",
    price: "450",
    inventory: "22"
  });
  const [products, setProducts] = useState<ProductDraft[]>([]);

  function saveProduct() {
    if (!draft.name.trim()) {
      return;
    }
    setProducts((existing) => [draft, ...existing]);
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>Catalog Management</Text>
      <SectionCard title="Add Product">
        <TextInput
          value={draft.name}
          onChangeText={(name) => setDraft((prev) => ({ ...prev, name }))}
          placeholder="Product name"
          style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}
        />
        <TextInput
          value={draft.price}
          onChangeText={(price) => setDraft((prev) => ({ ...prev, price }))}
          placeholder="Price (ETB)"
          keyboardType="numeric"
          style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}
        />
        <TextInput
          value={draft.inventory}
          onChangeText={(inventory) => setDraft((prev) => ({ ...prev, inventory }))}
          placeholder="Inventory"
          keyboardType="numeric"
          style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}
        />
        <Button title="Save Product" onPress={saveProduct} />
      </SectionCard>

      <SectionCard title="Current Products">
        {products.length === 0 ? <Text>No products yet.</Text> : null}
        {products.map((product, index) => (
          <Text key={`${product.name}-${index}`}>
            {product.name} • ETB {product.price} • Stock {product.inventory}
          </Text>
        ))}
      </SectionCard>
    </ScrollView>
  );
}
