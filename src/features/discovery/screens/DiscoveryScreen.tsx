import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Icon } from "../../../components/Icon";
import { ProductCard } from "../../../components/ProductCard";
import { TamagnScreen } from "../../../components/TamagnScreen";
import { EmptyState } from "../../../components/EmptyState";
import { useCart } from "../../../core/cart/CartContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow } from "../../../core/theme/tokens";
import { PRODUCT_CATEGORIES, MOCK_LISTINGS } from "../../../data/mock";
import { useProductSearch } from "../hooks/useProductSearch";

export function DiscoveryScreen({ navigation }: { navigation: any }): JSX.Element {
  const { search, setSearch, activeCategory, setActiveCategory, filtered } = useProductSearch(MOCK_LISTINGS);
  const { addItem } = useCart();

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
          <Icon name="search" size={20} color={tamagnColors.outline} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search products, verified sellers..."
            placeholderTextColor={tamagnColors.outlineVariant}
            style={{ flex: 1, paddingVertical: 14, paddingHorizontal: 10, fontSize: 15, color: tamagnColors.onSurface }}
          />
          <View style={{ flexDirection: "row", gap: 8 }}>
            {search ? (
              <Pressable onPress={() => setSearch("")} style={{ padding: 4 }}>
                <Icon name="close" size={16} color={tamagnColors.secondary} />
              </Pressable>
            ) : null}
            <Pressable style={{ padding: 4 }}>
              <Icon name="filter" size={18} color={tamagnColors.outline} />
            </Pressable>
            <Pressable style={{ padding: 4 }}>
              <Icon name="sort" size={18} color={tamagnColors.outline} />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Category Chips */}
      <View style={{ marginBottom: tamagnSpacing.md }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: tamagnSpacing.md }}>
          {PRODUCT_CATEGORIES.map((cat) => {
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
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: tamagnSpacing.sm }}>
          <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>
            {filtered.length} results
          </Text>
          <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>Sort: Popularity</Text>
        </View>
        {filtered.length === 0 ? (
          <EmptyState icon="search" title="No results found" subtitle="Try a different search or category" />
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
