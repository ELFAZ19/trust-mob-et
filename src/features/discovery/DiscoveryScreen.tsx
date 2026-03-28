import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { ProductCard } from "../../components/ProductCard";
import { TamagnScreen } from "../../components/TamagnScreen";
import { EmptyState } from "../../components/EmptyState";
import { useCart } from "../../core/cart/CartContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow } from "../../core/theme/tokens";
import type { MarketplaceCard } from "../../core/types/domain";

const categories = ["All Items", "Food", "Coffee", "Spices", "Clothing", "Electronics", "Handicrafts", "Fashion"];

const mockListings: MarketplaceCard[] = [
  { id: "p1", title: "Sidama Specialty Coffee", description: "Premium single-origin Yirgacheffe beans from verified farm.", price: 450, category: "Coffee", merchantId: "m1", merchantName: "Harar Beans", rating: 4.9, reviewCount: 203, distanceKm: 1.2, etaMinutes: 28, trustScore: 96, inStock: true },
  { id: "p2", title: "Abyssinia Pro Runners", description: "Ethiopian-made performance athletic shoes.", price: 3200, category: "Fashion", merchantId: "m2", merchantName: "Ethio Sport", rating: 4.7, reviewCount: 89, distanceKm: 3.5, etaMinutes: 45, trustScore: 88, inStock: true },
  { id: "p3", title: "Amharic Literature Set", description: "Classic Amharic novels and poetry collection.", price: 850, category: "Handicrafts", merchantId: "m3", merchantName: "Arat Kilo Books", rating: 5.0, reviewCount: 42, distanceKm: 0.8, etaMinutes: 15, trustScore: 78, inStock: true },
  { id: "p4", title: "Fresh Injera Pack", description: "Daily baked fresh injera from verified kitchen.", price: 180, category: "Food", merchantId: "m4", merchantName: "Selam Foods", rating: 4.8, reviewCount: 124, distanceKm: 1.3, etaMinutes: 25, trustScore: 92, inStock: true },
  { id: "p5", title: "Berbere Spice Mix", description: "Authentic homemade berbere blend from Merkato.", price: 250, category: "Spices", merchantId: "m5", merchantName: "Merkato Finest", rating: 4.6, reviewCount: 87, distanceKm: 2.1, etaMinutes: 35, trustScore: 85, inStock: true },
  { id: "p6", title: "Honey (Wild Forest)", description: "Pure wild honey from Bale mountains.", price: 380, category: "Food", merchantId: "m6", merchantName: "Nature's Gift", rating: 4.8, reviewCount: 92, distanceKm: 4.2, etaMinutes: 50, trustScore: 91, inStock: true },
  { id: "p7", title: "Handwoven Shemma", description: "Traditional Ethiopian cotton garment from Dorze.", price: 1200, category: "Clothing", merchantId: "m7", merchantName: "Dorze Weavers", rating: 4.7, reviewCount: 56, distanceKm: 5.0, etaMinutes: 60, trustScore: 88, inStock: true },
  { id: "p8", title: "Samsung Galaxy A55", description: "Latest Samsung mid-range, dual SIM, 128GB.", price: 18500, category: "Electronics", merchantId: "m8", merchantName: "NextGen Electronics", rating: 4.9, reviewCount: 178, distanceKm: 0.5, etaMinutes: 20, trustScore: 94, inStock: true },
];

export function DiscoveryScreen({ navigation }: { navigation: any }): JSX.Element {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Items");
  const { addItem } = useCart();

  const filtered = useMemo(() => {
    return mockListings.filter((item) => {
      const matchCat = activeCategory === "All Items" || item.category === activeCategory;
      const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.merchantName.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <TamagnScreen noPadding>
      {/* Editorial Hero Title */}
      <View style={{ paddingHorizontal: tamagnSpacing.md, marginBottom: tamagnSpacing.md }}>
        <Text style={{ ...tamagnTypography.heroTitle, color: tamagnColors.onSurface }}>
          Discover trusted{" "}
          <Text style={{ color: tamagnColors.primary }}>local commerce</Text>
        </Text>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: tamagnSpacing.md, marginBottom: tamagnSpacing.md }}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: tamagnColors.surfaceContainerLowest,
          borderRadius: tamagnRadius.lg,
          paddingHorizontal: 14,
          ...tamagnShadow,
        }}>
          <Text style={{ fontSize: 18, marginRight: 10, color: tamagnColors.outline }}>🔍</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search products, verified sellers..."
            placeholderTextColor={tamagnColors.outlineVariant}
            style={{ flex: 1, paddingVertical: 14, fontSize: 15, color: tamagnColors.onSurface }}
          />
          {search ? (
            <Pressable onPress={() => setSearch("")}>
              <Text style={{ fontSize: 16, color: tamagnColors.secondary }}>✕</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* Category Chips - horizontal scroll */}
      <View style={{ marginBottom: tamagnSpacing.md }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: tamagnSpacing.md }}>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: tamagnRadius.pill,
                  backgroundColor: active ? tamagnColors.primary : tamagnColors.surfaceContainerLowest,
                  ...(!active ? tamagnShadow : {}),
                }}
              >
                <Text style={{ ...tamagnTypography.captionBold, color: active ? tamagnColors.onPrimary : tamagnColors.secondary }}>
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Results */}
      <View style={{ paddingHorizontal: tamagnSpacing.md }}>
        <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginBottom: tamagnSpacing.sm }}>
          {filtered.length} results
        </Text>
        {filtered.length === 0 ? (
          <EmptyState icon="🔍" title="No results found" subtitle="Try a different search or category" />
        ) : (
          filtered.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              merchantName={item.merchantName}
              price={item.price}
              rating={item.rating}
              trustScore={item.trustScore}
              distanceKm={item.distanceKm}
              etaMinutes={item.etaMinutes}
              category={item.category}
              onPress={() => navigation.navigate("ProductDetail", { product: item })}
              onAddToCart={() => addItem({ listingId: item.id, title: item.title, price: item.price, merchantName: item.merchantName })}
            />
          ))
        )}
      </View>
    </TamagnScreen>
  );
}
