import React from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../core/auth/AuthContext";
import { tamagnColors, tamagnRadius, tamagnTypography } from "../core/theme/tokens";

import { SignInScreen } from "../features/auth/SignInScreen";
import { HomeScreen } from "../features/home/HomeScreen";
import { DiscoveryScreen } from "../features/discovery/DiscoveryScreen";
import { ProductDetailScreen } from "../features/discovery/ProductDetailScreen";
import { CartScreen } from "../features/cart/CartScreen";
import { CheckoutScreen } from "../features/cart/CheckoutScreen";
import { OrdersListScreen } from "../features/orders/OrdersListScreen";
import { OrderDetailScreen } from "../features/orders/OrderDetailScreen";
import { ReviewsScreen } from "../features/reviews/ReviewsScreen";
import { ProfileScreen } from "../features/profile/ProfileScreen";

import { MerchantDashboardScreen } from "../features/merchant/MerchantDashboardScreen";
import { CatalogManagementScreen } from "../features/catalog/CatalogManagementScreen";
import { MerchantOrdersScreen } from "../features/merchant/MerchantOrdersScreen";
import { MerchantAnalyticsScreen } from "../features/merchant/MerchantAnalyticsScreen";
import { PromotionsScreen } from "../features/promotions/PromotionsScreen";

import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BuyerTab = createBottomTabNavigator();
const MerchantTab = createBottomTabNavigator();

const TAB_ICONS_BUYER: Record<string, { active: string; inactive: string }> = {
  Home: { active: "🏠", inactive: "🏠" },
  Discovery: { active: "🔍", inactive: "🔍" },
  Cart: { active: "🛒", inactive: "🛒" },
  OrdersList: { active: "📦", inactive: "📦" },
  BuyerProfile: { active: "👤", inactive: "👤" },
};

const TAB_ICONS_MERCHANT: Record<string, { active: string; inactive: string }> = {
  Dashboard: { active: "📊", inactive: "📊" },
  Catalog: { active: "📋", inactive: "📋" },
  MerchantOrders: { active: "📦", inactive: "📦" },
  Analytics: { active: "📈", inactive: "📈" },
  MerchantProfile: { active: "👤", inactive: "👤" },
};

function TabIcon({ name, focused, icons }: { name: string; focused: boolean; icons: Record<string, { active: string; inactive: string }> }) {
  const emoji = icons[name]?.[focused ? "active" : "inactive"] ?? "●";
  return (
    <View style={focused ? {
      backgroundColor: "rgba(1,110,0,0.08)",
      borderRadius: tamagnRadius.lg,
      paddingHorizontal: 14,
      paddingVertical: 6,
    } : undefined}>
      <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
    </View>
  );
}

const glassTabBarStyle = {
  backgroundColor: Platform.OS === "web" ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.95)",
  borderTopWidth: 0,
  borderTopLeftRadius: 28,
  borderTopRightRadius: 28,
  position: "absolute" as const,
  left: 0,
  right: 0,
  bottom: 0,
  height: 72,
  paddingBottom: Platform.OS === "ios" ? 24 : 8,
  paddingTop: 8,
  elevation: 12,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 20,
  shadowOffset: { width: 0, height: -4 },
};

function BuyerTabs(): JSX.Element {
  return (
    <BuyerTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: glassTabBarStyle,
        tabBarActiveTintColor: tamagnColors.primary,
        tabBarInactiveTintColor: tamagnColors.secondary,
        tabBarLabelStyle: { ...tamagnTypography.labelSm, letterSpacing: 0.5, marginTop: -2 },
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} icons={TAB_ICONS_BUYER} />,
      })}
    >
      <BuyerTab.Screen name="Home" component={HomeScreen} />
      <BuyerTab.Screen name="Discovery" component={DiscoveryScreen} options={{ tabBarLabel: "Discover" }} />
      <BuyerTab.Screen name="Cart" component={CartScreen} />
      <BuyerTab.Screen name="OrdersList" component={OrdersListScreen} options={{ tabBarLabel: "Orders" }} />
      <BuyerTab.Screen name="BuyerProfile" component={ProfileScreen} options={{ tabBarLabel: "Profile" }} />
    </BuyerTab.Navigator>
  );
}

function MerchantTabs(): JSX.Element {
  return (
    <MerchantTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: glassTabBarStyle,
        tabBarActiveTintColor: tamagnColors.primary,
        tabBarInactiveTintColor: tamagnColors.secondary,
        tabBarLabelStyle: { ...tamagnTypography.labelSm, letterSpacing: 0.5, marginTop: -2 },
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} icons={TAB_ICONS_MERCHANT} />,
      })}
    >
      <MerchantTab.Screen name="Dashboard" component={MerchantDashboardScreen} />
      <MerchantTab.Screen name="Catalog" component={CatalogManagementScreen} />
      <MerchantTab.Screen name="MerchantOrders" component={MerchantOrdersScreen} options={{ tabBarLabel: "Orders" }} />
      <MerchantTab.Screen name="Analytics" component={MerchantAnalyticsScreen} />
      <MerchantTab.Screen name="MerchantProfile" component={ProfileScreen} options={{ tabBarLabel: "Profile" }} />
    </MerchantTab.Navigator>
  );
}

export function RootNavigator(): JSX.Element {
  const { isBooting, profile } = useAuth();

  if (isBooting) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: tamagnColors.surface }}>
        <Text style={{ ...tamagnTypography.displayLg, color: tamagnColors.primary, marginBottom: 12 }}>ታማኝ</Text>
        <ActivityIndicator color={tamagnColors.primary} size="large" />
        <Text style={{ color: tamagnColors.secondary, marginTop: 12, ...tamagnTypography.body }}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!profile ? (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      ) : profile.role === "merchant" ? (
        <>
          <Stack.Screen name="MerchantTabs" component={MerchantTabs} />
          <Stack.Screen name="Promotions" component={PromotionsScreen} />
          <Stack.Screen name="MerchantOrderDetail" component={OrderDetailScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="BuyerTabs" component={BuyerTabs} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
          <Stack.Screen name="Reviews" component={ReviewsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
