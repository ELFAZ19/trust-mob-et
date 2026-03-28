import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TamagnScreen } from "../../components/TamagnScreen";
import { SectionCard } from "../../components/SectionCard";
import { EmptyState } from "../../components/EmptyState";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow, GRADIENT_PRIMARY } from "../../core/theme/tokens";

interface CatalogProduct {
  id: string;
  title: string;
  price: number;
  category: string;
  active: boolean;
  stock: number;
}

const initialProducts: CatalogProduct[] = [
  { id: "cp1", title: "Sidama Specialty Coffee", price: 450, category: "Coffee", active: true, stock: 48 },
  { id: "cp2", title: "Berbere Spice Mix", price: 250, category: "Spices", active: true, stock: 85 },
  { id: "cp3", title: "Fresh Injera Pack", price: 180, category: "Food", active: true, stock: 120 },
  { id: "cp4", title: "Wild Forest Honey", price: 380, category: "Food", active: false, stock: 0 },
];

const categoryEmoji: Record<string, string> = { Coffee: "☕", Spices: "🌶️", Food: "🍲", Clothing: "👕", Electronics: "📱" };

export function CatalogManagementScreen(): JSX.Element {
  const [products, setProducts] = useState(initialProducts);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("Food");
  const [newStock, setNewStock] = useState("");

  function toggleActive(id: string) {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p));
  }

  function addProduct() {
    if (!newTitle || !newPrice) { Alert.alert("Error", "Fill in title and price"); return; }
    setProducts((prev) => [
      ...prev,
      { id: `cp${Date.now()}`, title: newTitle, price: Number(newPrice), category: newCategory, active: true, stock: Number(newStock) || 0 },
    ]);
    setNewTitle(""); setNewPrice(""); setNewStock(""); setShowAdd(false);
    Alert.alert("Added", "Product added to your catalog.");
  }

  const activeCount = products.filter((p) => p.active).length;

  return (
    <TamagnScreen
      title="Catalog"
      subtitle={`${products.length} products · ${activeCount} active`}
      headerRight={
        <Pressable onPress={() => setShowAdd(!showAdd)} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: tamagnColors.primaryContainer, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: tamagnColors.onPrimaryContainer }}>{showAdd ? "✕" : "+"}</Text>
        </Pressable>
      }
    >
      {/* Add Product Form */}
      {showAdd ? (
        <SectionCard title="Add New Product" accent={tamagnColors.primary}>
          <Field label="PRODUCT NAME" value={newTitle} onChangeText={setNewTitle} placeholder="e.g. Organic Teff Flour" />
          <Field label="PRICE (ETB)" value={newPrice} onChangeText={setNewPrice} placeholder="0" keyboardType="numeric" />
          <Field label="STOCK QUANTITY" value={newStock} onChangeText={setNewStock} placeholder="0" keyboardType="numeric" />

          <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: tamagnSpacing.xs, marginTop: tamagnSpacing.sm }}>CATEGORY</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: tamagnSpacing.md }}>
            {["Food", "Coffee", "Spices", "Clothing", "Electronics"].map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setNewCategory(cat)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: tamagnRadius.pill,
                  backgroundColor: newCategory === cat ? tamagnColors.primaryContainer : tamagnColors.surfaceContainerLow,
                }}
              >
                <Text style={{ ...tamagnTypography.captionBold, color: newCategory === cat ? tamagnColors.onPrimaryContainer : tamagnColors.secondary }}>
                  {categoryEmoji[cat] ?? "📦"} {cat}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable onPress={addProduct}>
            <LinearGradient
              colors={[...GRADIENT_PRIMARY]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: tamagnRadius.md, paddingVertical: 14, alignItems: "center" }}
            >
              <Text style={{ color: "#fff", fontWeight: "900", fontSize: 14 }}>Add Product</Text>
            </LinearGradient>
          </Pressable>
        </SectionCard>
      ) : null}

      {/* Product List */}
      {products.length === 0 ? (
        <EmptyState icon="📋" title="No products" subtitle="Tap + to add your first product" />
      ) : (
        products.map((product) => (
          <View
            key={product.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              padding: tamagnSpacing.md,
              marginBottom: tamagnSpacing.sm,
              backgroundColor: tamagnColors.surfaceContainerLowest,
              borderRadius: tamagnRadius.xl,
              opacity: product.active ? 1 : 0.5,
              ...tamagnShadow,
            }}
          >
            <View style={{ width: 52, height: 52, borderRadius: tamagnRadius.md, backgroundColor: tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 24 }}>{categoryEmoji[product.category] ?? "📦"}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>{product.title}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 2 }}>
                <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary }}>{product.price} ETB</Text>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>· {product.stock} in stock</Text>
              </View>
            </View>
            <Switch
              value={product.active}
              onValueChange={() => toggleActive(product.id)}
              trackColor={{ false: tamagnColors.outlineVariant, true: tamagnColors.primaryContainer }}
              thumbColor={product.active ? tamagnColors.primary : "#fff"}
            />
          </View>
        ))
      )}
    </TamagnScreen>
  );
}

function Field({ label, value, onChangeText, placeholder, keyboardType }: { label: string; value: string; onChangeText: (t: string) => void; placeholder: string; keyboardType?: "numeric" }) {
  return (
    <>
      <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: tamagnSpacing.xs, marginTop: tamagnSpacing.sm }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tamagnColors.outlineVariant}
        keyboardType={keyboardType}
        style={{ backgroundColor: tamagnColors.surfaceContainerLow, borderRadius: tamagnRadius.md, paddingVertical: 12, paddingHorizontal: 14, fontSize: 14, fontWeight: "600", color: tamagnColors.onSurface }}
      />
    </>
  );
}
