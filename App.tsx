import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/core/auth/AuthContext";
import { RootNavigator } from "./src/app/navigation/RootNavigator";

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7937/ingest/99d5636a-1d2f-4313-a070-712bda7f1746", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "569534" },
      body: JSON.stringify({
        sessionId: "569534",
        runId: "web-pre-fix-1",
        hypothesisId: "H2",
        location: "App.tsx:14",
        message: "App mounted",
        data: { platform: Platform.OS },
        timestamp: Date.now()
      })
    }).catch(() => {});
    // #endregion
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
