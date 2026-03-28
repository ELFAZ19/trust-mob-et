import React from "react";
import { Pressable, Text, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { StatCard } from "../../components/StatCard";
import { TamagnScreen } from "../../components/TamagnScreen";
import { TrustBadge } from "../../components/TrustBadge";
import { useAuth } from "../../core/auth/AuthContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";
import type { MarketplaceCard } from "../../core/types/domain";

const quickActions = [
  { icon: "🔍", label: "Browse", screen: "Discovery" },
  { icon: "📦", label: "Orders", screen: "OrdersList" },
  { icon: "🛒", label: "Cart", screen: "Cart" },
  { icon: "⭐", label: "Reviews", screen: "Reviews" },
];

const featuredItems: MarketplaceCard[] = [
  { id: "f1", title: "Fresh Injera Pack", price: 180, category: "Food", merchantId: "m1", merchantName: "Selam Foods", rating: 4.8, reviewCount: 124, distanceKm: 1.3, etaMinutes: 28, trustScore: 92, inStock: true, description: "", imageUrl: undefined },
  { id: "f2", title: "Berbere Spice Mix", price: 250, category: "Spices", merchantId: "m2", merchantName: "Merkato Finest", rating: 4.6, reviewCount: 87, distanceKm: 2.1, etaMinutes: 35, trustScore: 85, inStock: true, description: "", imageUrl: undefined },
  { id: "f3", title: "Organic Ethiopian Coffee", price: 450, category: "Coffee", merchantId: "m3", merchantName: "Harar Beans", rating: 4.9, reviewCount: 203, distanceKm: 3.4, etaMinutes: 45, trustScore: 96, inStock: true, description: "", imageUrl: undefined },
];

export function HomeScreen({ navigation }: { navigation: any }): JSX.Element {
  const { profile } = useAuth();
  const greeting = getGreeting();

  return (
    <TamagnScreen>
      {/* Hero */}
      <View style={{ marginBottom: tamagnSpacing.lg }}>
        <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary }}>{greeting}</Text>
        <Text style={{ ...tamagnTypography.heroTitle, color: tamagnColors.onSurface, marginTop: 2 }}>
          {profile?.fullName ?? "Tamagn User"}
        </Text>
        <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 4 }}>
          Discover trusted merchants near you
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.lg }}>
        {quickActions.map((action) => (
          <Pressable
            key={action.label}
            onPress={() => navigation.navigate(action.screen)}
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: tamagnColors.surfaceContainerLowest,
              borderRadius: tamagnRadius.lg,
              paddingVertical: 16,
              shadowColor: tamagnColors.onSurface,
              shadowOpacity: 0.04,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
              elevation: 1,
            }}
          >
            <Text style={{ fontSize: 22, marginBottom: 6 }}>{action.icon}</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.onSurface }}>{action.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Stats */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.lg }}>
        <StatCard icon="🛡️" label="Trust Score" value="92" color={tamagnColors.primary} />
        <StatCard icon="📦" label="Active Orders" value="2" color={tamagnColors.tertiary} />
      </View>

      {/* Featured */}
      <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, marginBottom: tamagnSpacing.sm }}>
        Featured Near You
      </Text>
      {featuredItems.map((item) => (
        <SectionCard
          key={item.id}
          onPress={() => navigation.navigate("ProductDetail", { product: item })}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{item.title}</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 2 }}>{item.merchantName}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 }}>
                <TrustBadge tier={item.trustScore >= 90 ? "Gold" : item.trustScore >= 75 ? "Silver" : "Bronze"} />
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>⭐ {item.rating}</Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary }}>ETB {item.price}</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 4 }}>{item.etaMinutes} min</Text>
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
