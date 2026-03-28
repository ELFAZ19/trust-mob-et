import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../core/auth/AuthContext";
import { tamagnColors } from "../core/theme/tokens";

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

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>;
}

function BuyerTabs(): JSX.Element {
  return (
    <BuyerTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tamagnColors.surfaceContainerLowest,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: tamagnColors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
          height: 60,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: tamagnColors.primary,
        tabBarInactiveTintColor: tamagnColors.secondary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <BuyerTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} /> }}
      />
      <BuyerTab.Screen
        name="Discovery"
        component={DiscoveryScreen}
        options={{ tabBarLabel: "Discover", tabBarIcon: ({ focused }) => <TabIcon emoji="🔍" focused={focused} /> }}
      />
      <BuyerTab.Screen
        name="Cart"
        component={CartScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="🛒" focused={focused} /> }}
      />
      <BuyerTab.Screen
        name="OrdersList"
        component={OrdersListScreen}
        options={{ tabBarLabel: "Orders", tabBarIcon: ({ focused }) => <TabIcon emoji="📦" focused={focused} /> }}
      />
      <BuyerTab.Screen
        name="BuyerProfile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile", tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} /> }}
      />
    </BuyerTab.Navigator>
  );
}

function MerchantTabs(): JSX.Element {
  return (
    <MerchantTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tamagnColors.surfaceContainerLowest,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: tamagnColors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
          height: 60,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: tamagnColors.primary,
        tabBarInactiveTintColor: tamagnColors.secondary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <MerchantTab.Screen
        name="Dashboard"
        component={MerchantDashboardScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="📊" focused={focused} /> }}
      />
      <MerchantTab.Screen
        name="Catalog"
        component={CatalogManagementScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="📋" focused={focused} /> }}
      />
      <MerchantTab.Screen
        name="MerchantOrders"
        component={MerchantOrdersScreen}
        options={{ tabBarLabel: "Orders", tabBarIcon: ({ focused }) => <TabIcon emoji="📦" focused={focused} /> }}
      />
      <MerchantTab.Screen
        name="Analytics"
        component={MerchantAnalyticsScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="📈" focused={focused} /> }}
      />
      <MerchantTab.Screen
        name="MerchantProfile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile", tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} /> }}
      />
    </MerchantTab.Navigator>
  );
}

export function RootNavigator(): JSX.Element {
  const { isBooting, profile } = useAuth();

  if (isBooting) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: tamagnColors.surface }}>
        <Text style={{ fontSize: 32, marginBottom: 12 }}>🛡️</Text>
        <ActivityIndicator color={tamagnColors.primary} size="large" />
        <Text style={{ color: tamagnColors.secondary, marginTop: 12, fontSize: 14 }}>Loading ታማኝ...</Text>
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
