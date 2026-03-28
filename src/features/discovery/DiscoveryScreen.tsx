import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { ProductCard } from "../../components/ProductCard";
import { TamagnScreen } from "../../components/TamagnScreen";
import { EmptyState } from "../../components/EmptyState";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";
import type { MarketplaceCard } from "../../core/types/domain";

const categories = ["All", "Food", "Coffee", "Spices", "Clothing", "Electronics", "Home"];

const mockListings: MarketplaceCard[] = [
  { id: "p1", title: "Fresh Injera Pack", description: "Daily baked fresh injera from verified kitchen.", price: 180, category: "Food", merchantId: "m1", merchantName: "Selam Foods", rating: 4.8, reviewCount: 124, distanceKm: 1.3, etaMinutes: 28, trustScore: 92, inStock: true },
  { id: "p2", title: "Organic Ethiopian Coffee", description: "Premium single-origin Yirgacheffe beans.", price: 450, category: "Coffee", merchantId: "m3", merchantName: "Harar Beans", rating: 4.9, reviewCount: 203, distanceKm: 3.4, etaMinutes: 45, trustScore: 96, inStock: true },
  { id: "p3", title: "Berbere Spice Mix", description: "Authentic homemade berbere blend.", price: 250, category: "Spices", merchantId: "m2", merchantName: "Merkato Finest", rating: 4.6, reviewCount: 87, distanceKm: 2.1, etaMinutes: 35, trustScore: 85, inStock: true },
  { id: "p4", title: "Handwoven Shemma", description: "Traditional Ethiopian cotton garment.", price: 1200, category: "Clothing", merchantId: "m4", merchantName: "Dorze Weavers", rating: 4.7, reviewCount: 56, distanceKm: 5.0, etaMinutes: 60, trustScore: 88, inStock: true },
  { id: "p5", title: "Roasted Coffee Bundle", description: "Freshly roasted Sidamo beans, 500g.", price: 320, category: "Coffee", merchantId: "m5", merchantName: "Bunna House", rating: 4.5, reviewCount: 45, distanceKm: 1.8, etaMinutes: 30, trustScore: 80, inStock: true },
  { id: "p6", title: "Honey (Wild Forest)", description: "Pure wild honey from Bale mountains.", price: 380, category: "Food", merchantId: "m6", merchantName: "Nature's Gift", rating: 4.8, reviewCount: 92, distanceKm: 4.2, etaMinutes: 50, trustScore: 91, inStock: true },
];

export function DiscoveryScreen({ navigation }: { navigation: any }): JSX.Element {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return mockListings.filter((item) => {
      const matchCategory = activeCategory === "All" || item.category === activeCategory;
      const matchSearch = !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.merchantName.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <TamagnScreen title="Discover" subtitle="Find trusted merchants near you">
      {/* Search */}
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: tamagnColors.surfaceContainerLowest,
        borderRadius: tamagnRadius.lg,
        paddingHorizontal: 14,
        marginBottom: tamagnSpacing.md,
        shadowColor: tamagnColors.onSurface,
        shadowOpacity: 0.04,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
      }}>
        <Text style={{ fontSize: 18, marginRight: 10 }}>🔍</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search products, merchants..."
          placeholderTextColor={tamagnColors.outlineVariant}
          style={{ flex: 1, paddingVertical: 14, fontSize: 15, color: tamagnColors.onSurface }}
        />
        {search ? (
          <Pressable onPress={() => setSearch("")}>
            <Text style={{ fontSize: 16, color: tamagnColors.secondary }}>✕</Text>
          </Pressable>
        ) : null}
      </View>

      {/* Categories */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: tamagnSpacing.lg }}>
        {categories.map((cat) => {
          const active = activeCategory === cat;
          return (
            <Pressable
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: tamagnRadius.pill,
                backgroundColor: active ? tamagnColors.primaryContainer : tamagnColors.surfaceContainer,
              }}
            >
              <Text style={{ fontWeight: "700", fontSize: 13, color: active ? tamagnColors.onPrimaryContainer : tamagnColors.secondary }}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Results */}
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
          />
        ))
      )}
    </TamagnScreen>
  );
}
