import { Platform, StyleSheet } from "react-native";

export const tamagnColors = {
  primary: "#016e00",
  primaryContainer: "#00be00",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#014400",
  primaryFixed: "#77ff61",
  primaryFixedDim: "#45e335",
  onPrimaryFixed: "#002200",
  onPrimaryFixedVariant: "#015300",

  secondary: "#5f5e5e",
  secondaryContainer: "#e2dfde",
  onSecondaryContainer: "#636262",
  secondaryFixed: "#e5e2e1",

  tertiary: "#904d00",
  tertiaryContainer: "#f68700",
  onTertiaryContainer: "#5b2e00",
  tertiaryFixed: "#ffdcc3",

  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  onError: "#ffffff",
  onErrorContainer: "#93000a",

  onSurface: "#1a1c1c",
  onSurfaceVariant: "#3d4a38",
  onBackground: "#1a1c1c",

  surface: "#f9f9f9",
  surfaceBright: "#f9f9f9",
  surfaceDim: "#dadada",
  surfaceContainer: "#eeeeee",
  surfaceContainerLow: "#f3f3f3",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerHigh: "#e8e8e8",
  surfaceContainerHighest: "#e2e2e2",
  surfaceVariant: "#e2e2e2",

  outline: "#6d7b66",
  outlineVariant: "#bccbb2",

  inverseSurface: "#2f3131",
  inverseOnSurface: "#f1f1f1",
  inversePrimary: "#45e335",

  success: "#016e00",
  warning: "#f68700",
  gold: "#FFD700",
  silver: "#C0C0C0",
  bronze: "#CD7F32",

  scrim: "rgba(0,0,0,0.32)",
} as const;

export const tamagnSpacing = {
  xxs: 4,
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const tamagnRadius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  hero: 40,
  pill: 999,
} as const;

export const tamagnTypography = {
  displayLg: { fontSize: 42, fontWeight: "900" as const, letterSpacing: -1 },
  heroTitle: { fontSize: 34, fontWeight: "800" as const, letterSpacing: -0.5 },
  screenTitle: { fontSize: 28, fontWeight: "800" as const, letterSpacing: -0.3 },
  sectionTitle: { fontSize: 20, fontWeight: "700" as const, letterSpacing: -0.1 },
  cardTitle: { fontSize: 16, fontWeight: "700" as const },
  body: { fontSize: 14, fontWeight: "400" as const, lineHeight: 20 },
  bodyMedium: { fontSize: 14, fontWeight: "500" as const, lineHeight: 20 },
  bodyBold: { fontSize: 14, fontWeight: "600" as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: "500" as const },
  captionBold: { fontSize: 12, fontWeight: "700" as const },
  label: { fontSize: 11, fontWeight: "700" as const, letterSpacing: 0.8, textTransform: "uppercase" as const },
  labelSm: { fontSize: 10, fontWeight: "800" as const, letterSpacing: 1.2, textTransform: "uppercase" as const },
  price: { fontSize: 18, fontWeight: "800" as const },
  priceLarge: { fontSize: 24, fontWeight: "900" as const },
  stat: { fontSize: 28, fontWeight: "800" as const },
  statLg: { fontSize: 36, fontWeight: "900" as const },
} as const;

export const tamagnShadow = Platform.select({
  ios: {
    shadowColor: "#1a1c1c",
    shadowOpacity: 0.06,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
  },
  android: { elevation: 3 },
  default: {
    shadowColor: "#1a1c1c",
    shadowOpacity: 0.06,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
  },
}) as Record<string, unknown>;

export const tamagnShadowHeavy = Platform.select({
  ios: {
    shadowColor: "#1a1c1c",
    shadowOpacity: 0.12,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 12 },
  },
  android: { elevation: 6 },
  default: {
    shadowColor: "#1a1c1c",
    shadowOpacity: 0.12,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 12 },
  },
}) as Record<string, unknown>;

export const GRADIENT_PRIMARY = [tamagnColors.primary, tamagnColors.primaryContainer] as const;
export const GRADIENT_DARK = [tamagnColors.inverseSurface, "#1a2020"] as const;
