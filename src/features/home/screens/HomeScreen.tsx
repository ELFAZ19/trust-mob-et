import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "../../../components/Icon";
import { SectionCard } from "../../../components/SectionCard";
import { TamagnScreen } from "../../../components/TamagnScreen";
import { TrustBadge } from "../../../components/TrustBadge";
import { useAuth } from "../../../core/auth/AuthContext";
import { useCart } from "../../../core/cart/CartContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow, GRADIENT_DARK } from "../../../core/theme/tokens";
import { getMerchantImage, HERO_IMAGES, getProductImage } from "../../../core/constants/images";
import { HOME_CATEGORIES, FEATURED_PRODUCTS, SERVICES, MOCK_MERCHANTS } from "../../../data/mock";

export function HomeScreen({ navigation }: { navigation: any }): JSX.Element {
  const { profile } = useAuth();
  const { itemCount } = useCart();
  const greeting = getGreeting();

  return (
    <TamagnScreen>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: tamagnSpacing.sm }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Icon name="location" size={20} color={tamagnColors.primary} />
          <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.primary, letterSpacing: -1 }}>ታማኝ</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: tamagnColors.surfaceContainerLow, justifyContent: "center", alignItems: "center" }}>
            <Icon name="bell" size={20} color={tamagnColors.onSurface} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Cart")} style={{ position: "relative", width: 40, height: 40, borderRadius: 20, backgroundColor: tamagnColors.surfaceContainerLow, justifyContent: "center", alignItems: "center" }}>
            <Icon name="cart" size={20} color={tamagnColors.onSurface} />
            {itemCount > 0 ? (
              <View style={{ position: "absolute", top: -2, right: -2, width: 18, height: 18, borderRadius: 9, backgroundColor: tamagnColors.error, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: tamagnColors.surface }}>
                <Text style={{ color: "#fff", fontSize: 9, fontWeight: "800" }}>{itemCount}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>
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
          paddingLeft: 14,
          height: 52,
          marginBottom: tamagnSpacing.xl,
          overflow: "hidden",
        }}
      >
        <Icon name="search" size={20} color={tamagnColors.outline} />
        <Text style={{ ...tamagnTypography.bodyMedium, color: tamagnColors.outline, flex: 1, marginLeft: 10 }}>Search in Addis Ababa...</Text>
        <View style={{ backgroundColor: tamagnColors.primary, borderRadius: tamagnRadius.sm, paddingHorizontal: 14, paddingVertical: 8, marginRight: 4, flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Icon name="filter" size={14} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>Filter</Text>
        </View>
      </Pressable>

      {/* Categories Grid */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: tamagnSpacing.md }}>
        <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface }}>Explore Categories</Text>
        <Pressable><Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.primary }}>View All</Text></Pressable>
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.xl }}>
        {HOME_CATEGORIES.map((cat) => (
          <Pressable
            key={cat.label}
            onPress={() => navigation.navigate("Discovery")}
            style={{ flex: 1, alignItems: "center", backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.xxl, paddingVertical: 18, ...tamagnShadow }}
          >
            <View style={{ width: 48, height: 48, borderRadius: tamagnRadius.md, backgroundColor: cat.color, justifyContent: "center", alignItems: "center", marginBottom: 8 }}>
              <Icon name={cat.icon} size={24} color={tamagnColors.primary} />
            </View>
            <Text style={{ ...tamagnTypography.labelSm, color: tamagnColors.onSurface }}>{cat.label.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>

      {/* Trusted Merchants Horizontal */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: tamagnSpacing.md }}>
        <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface }}>Trusted Merchants Nearby</Text>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
            <Icon name="back" size={14} color={tamagnColors.secondary} />
          </View>
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
            <Icon name="forward" size={14} color={tamagnColors.secondary} />
          </View>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: tamagnSpacing.xl, marginHorizontal: -tamagnSpacing.md }} contentContainerStyle={{ paddingHorizontal: tamagnSpacing.md, gap: 14 }}>
        {MOCK_MERCHANTS.map((m, idx) => (
          <Pressable key={m.name} onPress={() => navigation.navigate("Discovery")} style={{ width: 220 }}>
            <View style={{ height: 130, borderRadius: tamagnRadius.xxl, overflow: "hidden", marginBottom: 8 }}>
              <Image source={{ uri: getMerchantImage(idx) }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
              {m.verified ? (
                <View style={{ position: "absolute", top: 8, left: 8 }}>
                  <TrustBadge tier="Gold" label="Tamagn" />
                </View>
              ) : null}
            </View>
            <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }} numberOfLines={1}>{m.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
              <Icon name="star" size={12} color={tamagnColors.tertiary} />
              <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.onSurface }}>{m.rating}</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>· {m.distance} away</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Trending Dark Section */}
      <View style={{ borderRadius: tamagnRadius.hero, overflow: "hidden", marginBottom: tamagnSpacing.xl }}>
        <LinearGradient colors={[...GRADIENT_DARK]} style={{ padding: tamagnSpacing.lg, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: tamagnColors.tertiary, alignSelf: "flex-start", borderRadius: tamagnRadius.pill, paddingHorizontal: 10, paddingVertical: 4, marginBottom: tamagnSpacing.md }}>
              <Text style={{ ...tamagnTypography.labelSm, color: "#fff" }}>TRENDING NOW</Text>
            </View>
            <Text style={{ fontSize: 26, fontWeight: "900", color: "#fff", marginBottom: 8 }}>Pure Teff{"\n"}Direct from Farmers</Text>
            <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondaryFixed, marginBottom: tamagnSpacing.md }}>
              Premium quality, sand-free, ethically sourced.
            </Text>
            <Pressable onPress={() => navigation.navigate("Discovery")} style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: tamagnColors.primaryContainer, alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 14, borderRadius: tamagnRadius.lg }}>
              <Text style={{ fontWeight: "900", color: tamagnColors.onPrimaryContainer }}>Shop Collection</Text>
              <Icon name="forward" size={16} color={tamagnColors.onPrimaryContainer} />
            </Pressable>
          </View>
          <View style={{ width: 120, height: 140, borderRadius: tamagnRadius.xl, overflow: "hidden", marginLeft: 12 }}>
            <Image source={{ uri: HERO_IMAGES.trendingTeff }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          </View>
        </LinearGradient>
      </View>

      {/* Featured Products */}
      <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, marginBottom: tamagnSpacing.md }}>Popular Near You</Text>
      {FEATURED_PRODUCTS.map((item) => (
        <SectionCard key={item.id} onPress={() => navigation.navigate("ProductDetail", { product: item })}>
          <View style={{ flexDirection: "row", gap: 14 }}>
            <View style={{ width: 72, height: 72, borderRadius: tamagnRadius.lg, overflow: "hidden" }}>
              <Image source={{ uri: getProductImage(item.category) }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{item.title}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 }}>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{item.merchantName}</Text>
                <Text style={{ color: tamagnColors.outlineVariant }}>·</Text>
                <Icon name="star" size={10} color={tamagnColors.tertiary} />
                <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.tertiary }}>{item.rating}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary }}>{item.price} ETB</Text>
                <TrustBadge tier={item.trustScore >= 90 ? "Gold" : "Silver"} />
              </View>
            </View>
          </View>
        </SectionCard>
      ))}

      {/* Recommended Services */}
      <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, marginTop: tamagnSpacing.md, marginBottom: tamagnSpacing.md }}>Recommended Services</Text>
      {SERVICES.map((svc) => (
        <View key={svc.title} style={{ flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: tamagnColors.surfaceContainerLowest, padding: tamagnSpacing.md, borderRadius: tamagnRadius.lg, marginBottom: tamagnSpacing.sm, ...tamagnShadow }}>
          <View style={{ width: 52, height: 52, borderRadius: tamagnRadius.sm, overflow: "hidden" }}>
            <Image source={{ uri: getProductImage("services") }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>{svc.title}</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{svc.sub}</Text>
          </View>
          <Pressable style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
            <Icon name="plus" size={16} color={tamagnColors.primary} />
          </Pressable>
        </View>
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
