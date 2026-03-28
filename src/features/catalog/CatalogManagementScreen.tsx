import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnButton } from "../../components/TamagnButton";
import { TamagnScreen } from "../../components/TamagnScreen";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";
import type { MerchantProduct } from "../../core/types/domain";

const initialProducts: MerchantProduct[] = [
  { id: "mp1", merchantId: "m1", name: "Fresh Injera Pack", description: "Daily baked injera", price: 180, category: "Food", inventory: 45, isActive: true },
  { id: "mp2", merchantId: "m1", name: "Berbere Spice Mix", description: "Authentic blend", price: 250, category: "Spices", inventory: 23, isActive: true },
  { id: "mp3", merchantId: "m1", name: "Roasted Coffee Bundle", description: "500g Sidamo beans", price: 320, category: "Coffee", inventory: 12, isActive: true },
  { id: "mp4", merchantId: "m1", name: "Honey (Wild Forest)", description: "Pure Bale honey", price: 380, category: "Food", inventory: 0, isActive: false },
];

interface ProductForm {
  name: string;
  description: string;
  price: string;
  category: string;
  inventory: string;
}

const emptyForm: ProductForm = { name: "", description: "", price: "", category: "Food", inventory: "" };

export function CatalogManagementScreen(): JSX.Element {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProductForm>(emptyForm);

  function handleSave() {
    if (!form.name.trim() || !form.price.trim()) {
      Alert.alert("Missing fields", "Name and price are required.");
      return;
    }
    const newProduct: MerchantProduct = {
      id: `mp-${Date.now()}`,
      merchantId: "m1",
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      inventory: Number(form.inventory) || 0,
      isActive: true,
    };
    setProducts([newProduct, ...products]);
    setForm(emptyForm);
    setShowForm(false);
    Alert.alert("Product Added", newProduct.name);
  }

  function toggleActive(id: string) {
    setProducts(products.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)));
  }

  return (
    <TamagnScreen title="Catalog" subtitle={`${products.length} products`}>
      <TamagnButton title={showForm ? "Cancel" : "➕ Add Product"} onPress={() => setShowForm(!showForm)} variant={showForm ? "secondary" : "primary"} />
      <View style={{ height: tamagnSpacing.md }} />

      {showForm ? (
        <SectionCard title="New Product">
          <FormField label="Product Name" value={form.name} onChange={(name) => setForm({ ...form, name })} placeholder="e.g. Special Coffee Beans" />
          <FormField label="Description" value={form.description} onChange={(description) => setForm({ ...form, description })} placeholder="Brief description" multiline />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <FormField label="Price (ETB)" value={form.price} onChange={(price) => setForm({ ...form, price })} placeholder="0" keyboardType="numeric" />
            </View>
            <View style={{ flex: 1 }}>
              <FormField label="Inventory" value={form.inventory} onChange={(inventory) => setForm({ ...form, inventory })} placeholder="0" keyboardType="numeric" />
            </View>
          </View>
          <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: 6, marginTop: 8 }}>CATEGORY</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: tamagnSpacing.md }}>
            {["Food", "Coffee", "Spices", "Clothing", "Electronics", "Home"].map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setForm({ ...form, category: cat })}
                style={{
                  paddingHorizontal: 12, paddingVertical: 6,
                  borderRadius: tamagnRadius.pill,
                  backgroundColor: form.category === cat ? tamagnColors.primaryContainer : tamagnColors.surfaceContainer,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "700", color: form.category === cat ? tamagnColors.onPrimaryContainer : tamagnColors.secondary }}>{cat}</Text>
              </Pressable>
            ))}
          </View>
          <TamagnButton title="Save Product" onPress={handleSave} />
        </SectionCard>
      ) : null}

      {/* Product List */}
      {products.map((product) => (
        <SectionCard key={product.id}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{product.name}</Text>
                <View style={{
                  backgroundColor: product.isActive ? "#E8F5E9" : "#F5F5F5",
                  borderRadius: tamagnRadius.pill,
                  paddingHorizontal: 6, paddingVertical: 2,
                }}>
                  <Text style={{ fontSize: 10, fontWeight: "700", color: product.isActive ? tamagnColors.primary : "#616161" }}>
                    {product.isActive ? "Active" : "Inactive"}
                  </Text>
                </View>
              </View>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 2 }}>{product.description}</Text>
              <View style={{ flexDirection: "row", gap: 16, marginTop: 4 }}>
                <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.primary }}>ETB {product.price}</Text>
                <Text style={{ ...tamagnTypography.caption, color: product.inventory > 0 ? tamagnColors.secondary : tamagnColors.error }}>
                  Stock: {product.inventory}
                </Text>
              </View>
            </View>
            <Pressable onPress={() => toggleActive(product.id)} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: tamagnRadius.sm, backgroundColor: tamagnColors.surfaceContainer }}>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.onSurface }}>{product.isActive ? "Deactivate" : "Activate"}</Text>
            </Pressable>
          </View>
        </SectionCard>
      ))}
    </TamagnScreen>
  );
}

function FormField({ label, value, onChange, placeholder, multiline, keyboardType }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; multiline?: boolean; keyboardType?: "numeric" | "default";
}) {
  return (
    <View style={{ marginBottom: tamagnSpacing.sm }}>
      <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: 4 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={tamagnColors.outlineVariant}
        multiline={multiline}
        keyboardType={keyboardType ?? "default"}
        style={{
          backgroundColor: tamagnColors.surfaceContainerLow,
          borderRadius: tamagnRadius.md,
          padding: 12,
          fontSize: 14,
          color: tamagnColors.onSurface,
          minHeight: multiline ? 60 : undefined,
        }}
      />
    </View>
  );
}
