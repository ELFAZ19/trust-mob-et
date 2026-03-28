import React from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "../components/Icon";
import type { IconName } from "../components/Icon";
import { useAuth } from "../core/auth/AuthContext";
import { useCart } from "../core/cart/CartContext";
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

const BUYER_TABS: { name: string; icon: IconName; label: string }[] = [
  { name: "Home", icon: "home", label: "Home" },
  { name: "Discovery", icon: "search", label: "Discover" },
  { name: "Cart", icon: "cart", label: "Cart" },
  { name: "OrdersList", icon: "package", label: "Orders" },
  { name: "BuyerProfile", icon: "user", label: "Profile" },
];

const MERCHANT_TABS: { name: string; icon: IconName; label: string }[] = [
  { name: "Dashboard", icon: "dashboard", label: "Dashboard" },
  { name: "Catalog", icon: "catalog", label: "Catalog" },
  { name: "MerchantOrders", icon: "package", label: "Orders" },
  { name: "Analytics", icon: "chart", label: "Analytics" },
  { name: "MerchantProfile", icon: "user", label: "Profile" },
];

const SCREEN_MAP: Record<string, React.ComponentType<any>> = {
  Home: HomeScreen,
  Discovery: DiscoveryScreen,
  Cart: CartScreen,
  OrdersList: OrdersListScreen,
  BuyerProfile: ProfileScreen,
  Dashboard: MerchantDashboardScreen,
  Catalog: CatalogManagementScreen,
  MerchantOrders: MerchantOrdersScreen,
  Analytics: MerchantAnalyticsScreen,
  MerchantProfile: ProfileScreen,
};

function TabIcon({ iconName, focused }: { iconName: IconName; focused: boolean }) {
  return (
    <View style={focused ? {
      backgroundColor: "rgba(1,110,0,0.1)",
      borderRadius: tamagnRadius.lg,
      paddingHorizontal: 14,
      paddingVertical: 6,
    } : undefined}>
      <Icon name={iconName} size={22} color={focused ? tamagnColors.primary : tamagnColors.secondary} strokeWidth={focused ? 2.2 : 1.8} />
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

function CartTabIcon({ focused }: { focused: boolean }) {
  const { itemCount } = useCart();
  return (
    <View>
      <TabIcon iconName="cart" focused={focused} />
      {itemCount > 0 ? (
        <View style={{
          position: "absolute",
          top: -4,
          right: -4,
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: tamagnColors.error,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 2,
          borderColor: tamagnColors.surface,
        }}>
          <Text style={{ color: "#fff", fontSize: 9, fontWeight: "800" }}>{itemCount > 9 ? "9+" : itemCount}</Text>
        </View>
      ) : null}
    </View>
  );
}

function BuyerTabs(): JSX.Element {
  return (
    <BuyerTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: glassTabBarStyle,
        tabBarActiveTintColor: tamagnColors.primary,
        tabBarInactiveTintColor: tamagnColors.secondary,
        tabBarLabelStyle: { ...tamagnTypography.labelSm, letterSpacing: 0.5, marginTop: -2 },
      }}
    >
      {BUYER_TABS.map((tab) => (
        <BuyerTab.Screen
          key={tab.name}
          name={tab.name}
          component={SCREEN_MAP[tab.name]}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: tab.name === "Cart"
              ? ({ focused }) => <CartTabIcon focused={focused} />
              : ({ focused }) => <TabIcon iconName={tab.icon} focused={focused} />,
          }}
        />
      ))}
    </BuyerTab.Navigator>
  );
}

function MerchantTabs(): JSX.Element {
  return (
    <MerchantTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: glassTabBarStyle,
        tabBarActiveTintColor: tamagnColors.primary,
        tabBarInactiveTintColor: tamagnColors.secondary,
        tabBarLabelStyle: { ...tamagnTypography.labelSm, letterSpacing: 0.5, marginTop: -2 },
      }}
    >
      {MERCHANT_TABS.map((tab) => (
        <MerchantTab.Screen
          key={tab.name}
          name={tab.name}
          component={SCREEN_MAP[tab.name]}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({ focused }) => <TabIcon iconName={tab.icon} focused={focused} />,
          }}
        />
      ))}
    </MerchantTab.Navigator>
  );
}

export function RootNavigator(): JSX.Element {
  const { isBooting, profile } = useAuth();

  if (isBooting) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: tamagnColors.surface }}>
        <View style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: tamagnColors.primary, justifyContent: "center", alignItems: "center", marginBottom: 16 }}>
          <Icon name="shield" size={32} color={tamagnColors.onPrimary} strokeWidth={2.5} />
        </View>
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
