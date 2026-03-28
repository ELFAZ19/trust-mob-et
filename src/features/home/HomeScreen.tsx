import React from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SectionCard } from "../../components/SectionCard";
import { StatCard } from "../../components/StatCard";
import { TamagnScreen } from "../../components/TamagnScreen";
import { TrustBadge } from "../../components/TrustBadge";
import { useAuth } from "../../core/auth/AuthContext";
import { useCart } from "../../core/cart/CartContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow, GRADIENT_DARK } from "../../core/theme/tokens";
import type { MarketplaceCard } from "../../core/types/domain";

const categories = [
  { icon: "🍲", label: "Food", color: "rgba(1,110,0,0.08)" },
  { icon: "📱", label: "Electronics", color: "rgba(246,135,0,0.08)" },
  { icon: "🏠", label: "Home", color: "rgba(226,223,222,0.6)" },
  { icon: "🔧", label: "Services", color: "rgba(119,255,97,0.15)" },
];

const merchants = [
  { name: "Bole Central Grocery", rating: 4.8, distance: "1.2km", verified: true },
  { name: "NextGen Electronics", rating: 4.9, distance: "0.5km", verified: true },
  { name: "Ethio Roast Coffee", rating: 4.7, distance: "2.3km", verified: false },
];

const featured: MarketplaceCard[] = [
  { id: "f1", title: "Sidama Specialty Coffee", price: 450, category: "Coffee", merchantId: "m1", merchantName: "Harar Beans", rating: 4.9, reviewCount: 203, distanceKm: 1.2, etaMinutes: 28, trustScore: 96, inStock: true, description: "Premium single-origin beans" },
  { id: "f2", title: "Fresh Injera Pack", price: 180, category: "Food", merchantId: "m2", merchantName: "Selam Foods", rating: 4.8, reviewCount: 124, distanceKm: 1.3, etaMinutes: 25, trustScore: 92, inStock: true, description: "Daily baked fresh injera" },
  { id: "f3", title: "Handwoven Shemma", price: 1200, category: "Clothing", merchantId: "m3", merchantName: "Dorze Weavers", rating: 4.7, reviewCount: 56, distanceKm: 5.0, etaMinutes: 60, trustScore: 88, inStock: true, description: "Traditional cotton garment" },
];

export function HomeScreen({ navigation }: { navigation: any }): JSX.Element {
  const { profile } = useAuth();
  const { itemCount } = useCart();
  const greeting = getGreeting();

  return (
    <TamagnScreen>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: tamagnSpacing.sm }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={{ fontSize: 20, color: tamagnColors.primary }}>📍</Text>
          <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.primary, letterSpacing: -1 }}>ታማኝ</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("Cart")} style={{ position: "relative", padding: 8 }}>
          <Text style={{ fontSize: 22 }}>🔔</Text>
        </Pressable>
      </View>

      {/* Greeting */}
      <View style={{ marginBottom: tamagnSpacing.lg }}>
        <Text style={{ ...tamagnTypography.heroTitle, color: tamagnColors.onSurface }}>
          {greeting} {profile?.fullName?.split(" ")[0] ?? ""}
        </Text>
        <Text style={{ ...tamagnTypography.bodyMedium, color: tamagnColors.secondary, marginTop: 4 }}>Ready to find the best deals today?</Text>
      </View>

      {/* Search Bar */}
      <Pressable
        onPress={() => navigation.navigate("Discovery")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: tamagnColors.surfaceContainerHigh,
          borderRadius: tamagnRadius.lg,
          paddingHorizontal: 14,
          height: 52,
          marginBottom: tamagnSpacing.xl,
        }}
      >
        <Text style={{ fontSize: 18, marginRight: 10, color: tamagnColors.outline }}>🔍</Text>
        <Text style={{ ...tamagnTypography.bodyMedium, color: tamagnColors.outline, flex: 1 }}>Search in Addis Ababa...</Text>
        <View style={{ backgroundColor: tamagnColors.primary, borderRadius: tamagnRadius.sm, paddingHorizontal: 14, paddingVertical: 8 }}>
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>Filter</Text>
        </View>
      </Pressable>

      {/* Categories Grid */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: tamagnSpacing.md }}>
        <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface }}>Explore Categories</Text>
        <Pressable><Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.primary }}>View All</Text></Pressable>
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.xl }}>
        {categories.map((cat) => (
          <Pressable
            key={cat.label}
            onPress={() => navigation.navigate("Discovery")}
            style={{ flex: 1, alignItems: "center", backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.xxl, paddingVertical: 18, ...tamagnShadow }}
          >
            <View style={{ width: 44, height: 44, borderRadius: tamagnRadius.sm, backgroundColor: cat.color, justifyContent: "center", alignItems: "center", marginBottom: 8 }}>
              <Text style={{ fontSize: 22 }}>{cat.icon}</Text>
            </View>
            <Text style={{ ...tamagnTypography.labelSm, color: tamagnColors.onSurface }}>{cat.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Trusted Merchants Horizontal */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: tamagnSpacing.md }}>
        <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface }}>Trusted Merchants Nearby</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: tamagnSpacing.xl, marginHorizontal: -tamagnSpacing.md }} contentContainerStyle={{ paddingHorizontal: tamagnSpacing.md, gap: 14 }}>
        {merchants.map((m) => (
          <Pressable key={m.name} onPress={() => navigation.navigate("Discovery")} style={{ width: 200 }}>
            <View style={{ height: 120, backgroundColor: tamagnColors.surfaceContainerHigh, borderRadius: tamagnRadius.xxl, justifyContent: "center", alignItems: "center", marginBottom: 8 }}>
              <Text style={{ fontSize: 36 }}>🏪</Text>
              {m.verified ? (
                <View style={{ position: "absolute", top: 8, left: 8 }}>
                  <TrustBadge tier="Gold" label="Tamagn" />
                </View>
              ) : null}
            </View>
            <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }} numberOfLines={1}>{m.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
              <Text style={{ fontSize: 12 }}>★</Text>
              <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.onSurface }}>{m.rating}</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>· {m.distance} away</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Trending Dark Section */}
      <View style={{ borderRadius: tamagnRadius.hero, overflow: "hidden", marginBottom: tamagnSpacing.xl }}>
        <LinearGradient colors={[...GRADIENT_DARK]} style={{ padding: tamagnSpacing.lg }}>
          <View style={{ backgroundColor: tamagnColors.tertiary, alignSelf: "flex-start", borderRadius: tamagnRadius.pill, paddingHorizontal: 10, paddingVertical: 4, marginBottom: tamagnSpacing.md }}>
            <Text style={{ ...tamagnTypography.labelSm, color: "#fff" }}>TRENDING NOW</Text>
          </View>
          <Text style={{ fontSize: 28, fontWeight: "900", color: "#fff", marginBottom: 8 }}>Pure Teff{"\n"}Direct from Farmers</Text>
          <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondaryFixed, marginBottom: tamagnSpacing.lg }}>
            Premium quality, sand-free, ethically sourced from the highlands.
          </Text>
          <Pressable onPress={() => navigation.navigate("Discovery")} style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: tamagnColors.primaryContainer, alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 14, borderRadius: tamagnRadius.lg }}>
            <Text style={{ fontWeight: "900", color: tamagnColors.onPrimaryContainer }}>Shop Collection</Text>
            <Text style={{ color: tamagnColors.onPrimaryContainer }}>→</Text>
          </Pressable>
        </LinearGradient>
      </View>

      {/* Featured Products */}
      <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, marginBottom: tamagnSpacing.md }}>Popular Near You</Text>
      {featured.map((item) => (
        <SectionCard key={item.id} onPress={() => navigation.navigate("ProductDetail", { product: item })}>
          <View style={{ flexDirection: "row", gap: 14 }}>
            <View style={{ width: 72, height: 72, borderRadius: tamagnRadius.lg, backgroundColor: tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 32 }}>{item.category === "Coffee" ? "☕" : item.category === "Food" ? "🍲" : "👕"}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{item.title}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 }}>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{item.merchantName}</Text>
                <Text style={{ color: tamagnColors.outlineVariant }}>·</Text>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>★ {item.rating}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary }}>{item.price} ETB</Text>
                <TrustBadge tier={item.trustScore >= 90 ? "Gold" : "Silver"} />
              </View>
            </View>
          </View>
        </SectionCard>
      ))}
    </TamagnScreen>
  );
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning,";
  if (h < 17) return "Good afternoon,";
  return "Good evening,";
}
