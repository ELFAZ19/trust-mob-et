import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../../core/auth/AuthContext";
import { RoleGate } from "../../core/guards/RoleGate";
import { AddressesScreen } from "../../features/addresses/AddressesScreen";
import { SignInScreen } from "../../features/auth/SignInScreen";
import { CatalogManagementScreen } from "../../features/catalog/CatalogManagementScreen";
import { DiscoveryScreen } from "../../features/discovery/DiscoveryScreen";
import { HomeScreen } from "../../features/home/HomeScreen";
import { MerchantAnalyticsScreen } from "../../features/merchant/MerchantAnalyticsScreen";
import { MerchantDashboardScreen } from "../../features/merchant/MerchantDashboardScreen";
import { OrderScreen } from "../../features/orders/OrderScreen";
import { EscrowStatusScreen } from "../../features/payments/EscrowStatusScreen";
import { PromotionsScreen } from "../../features/promotions/PromotionsScreen";
import { ReviewsScreen } from "../../features/reviews/ReviewsScreen";
import { ServiceProviderScreen } from "../../features/serviceProvider/ServiceProviderScreen";
import { TrackingScreen } from "../../features/tracking/TrackingScreen";
import { TrustScoreScreen } from "../../features/trust/TrustScoreScreen";
import type { RootStackParamList } from "./types";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

function MainTabs(): JSX.Element {
  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7937/ingest/99d5636a-1d2f-4313-a070-712bda7f1746", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "569534" },
      body: JSON.stringify({
        sessionId: "569534",
        runId: "web-pre-fix-1",
        hypothesisId: "H4",
        location: "RootNavigator.tsx:29",
        message: "MainTabs mounted",
        data: { tabCount: 12 },
        timestamp: Date.now()
      })
    }).catch(() => {});
    // #endregion
  }, []);

  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen
        name="Discovery"
        children={() => (
          <RoleGate allowedRoles={["buyer", "merchant", "serviceProvider"]}>
            <DiscoveryScreen />
          </RoleGate>
        )}
      />
      <Tabs.Screen
        name="Order"
        children={() => (
          <RoleGate allowedRoles={["buyer"]}>
            <OrderScreen />
          </RoleGate>
        )}
      />
      <Tabs.Screen
        name="Escrow"
        children={() => (
          <RoleGate allowedRoles={["buyer", "merchant"]}>
            <EscrowStatusScreen />
          </RoleGate>
        )}
      />
      <Tabs.Screen
        name="Tracking"
        children={() => (
          <RoleGate allowedRoles={["buyer", "merchant"]}>
            <TrackingScreen />
          </RoleGate>
        )}
      />
      <Tabs.Screen
        name="Reviews"
        children={() => (
          <RoleGate allowedRoles={["buyer"]}>
            <ReviewsScreen />
          </RoleGate>
        )}
      />
      <Tabs.Screen
        name="Addresses"
        children={() => (
          <RoleGate allowedRoles={["buyer"]}>
            <AddressesScreen />
          </RoleGate>
        )}
      />
      <Tabs.Screen
        name="Merchant"
        children={() => (
          <RoleGate allowedRoles={["merchant"]}>
            <MerchantDashboardScreen />
          </RoleGate>
        )}
      />
      <Tabs.Screen
        name="Catalog"
        children={() => (
          <RoleGate allowedRoles={["merchant"]}>
            <CatalogManagementScreen />
          </RoleGate>
        )}
      />
      <Tabs.Screen
        name="Analytics"
        children={() => (
          <RoleGate allowedRoles={["merchant"]}>
            <MerchantAnalyticsScreen />
          </RoleGate>
        )}
      />
      <Tabs.Screen
        name="Services"
        children={() => (
          <RoleGate allowedRoles={["serviceProvider"]}>
            <ServiceProviderScreen />
          </RoleGate>
        )}
      />
      <Tabs.Screen
        name="Trust"
        children={() => (
          <RoleGate allowedRoles={["buyer", "merchant"]}>
            <TrustScoreScreen />
          </RoleGate>
        )}
      />
      <Tabs.Screen
        name="Promotions"
        children={() => (
          <RoleGate allowedRoles={["merchant"]}>
            <PromotionsScreen />
          </RoleGate>
        )}
      />
    </Tabs.Navigator>
  );
}

export function RootNavigator(): JSX.Element {
  const { isBooting, profile } = useAuth();

  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7937/ingest/99d5636a-1d2f-4313-a070-712bda7f1746", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "569534" },
      body: JSON.stringify({
        sessionId: "569534",
        runId: "web-pre-fix-1",
        hypothesisId: "H3",
        location: "RootNavigator.tsx:149",
        message: "RootNavigator auth state",
        data: { isBooting, hasProfile: Boolean(profile), role: profile?.role ?? null },
        timestamp: Date.now()
      })
    }).catch(() => {});
    // #endregion
  }, [isBooting, profile]);

  if (isBooting) {
    // #region agent log
    fetch("http://127.0.0.1:7937/ingest/99d5636a-1d2f-4313-a070-712bda7f1746", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "569534" },
      body: JSON.stringify({
        sessionId: "569534",
        runId: "web-pre-fix-1",
        hypothesisId: "H3",
        location: "RootNavigator.tsx:166",
        message: "RootNavigator boot screen visible",
        data: {},
        timestamp: Date.now()
      })
    }).catch(() => {});
    // #endregion
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {profile ? (
        <RootStack.Screen name="MainTabs" component={MainTabs} />
      ) : (
        <RootStack.Screen name="SignIn" component={SignInScreen} />
      )}
    </RootStack.Navigator>
  );
}
