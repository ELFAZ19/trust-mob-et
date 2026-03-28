import { Platform } from "react-native";

export const tamagnColors = {
  primary: "#016e00",
  primaryContainer: "#00be00",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#014400",
  secondary: "#5f5e5e",
  secondaryContainer: "#e2dfde",
  tertiary: "#904d00",
  tertiaryContainer: "#f68700",
  onTertiaryContainer: "#5b2e00",
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  onSurface: "#1a1c1c",
  onSurfaceVariant: "#3d4a38",
  surface: "#f9f9f9",
  surfaceBright: "#f9f9f9",
  surfaceContainer: "#eeeeee",
  surfaceContainerLow: "#f3f3f3",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerHigh: "#e8e8e8",
  surfaceDim: "#dadada",
  outline: "#6d7b66",
  outlineVariant: "#bccbb2",
  primaryFixed: "#77ff61",
  primaryFixedDim: "#45e335",
  inverseSurface: "#2f3131",
  inverseOnSurface: "#f1f1f1",
  inversePrimary: "#45e335",
  success: "#016e00",
  warning: "#f68700",
  gold: "#FFD700",
  silver: "#C0C0C0",
  bronze: "#CD7F32",
} as const;

export const tamagnSpacing = {
  xxs: 4,
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const tamagnRadius = {
  sm: 10,
  md: 16,
  lg: 20,
  xl: 24,
  hero: 36,
  pill: 999,
} as const;

export const tamagnTypography = {
  heroTitle: { fontSize: 34, fontWeight: "800" as const, letterSpacing: -0.5 },
  screenTitle: { fontSize: 28, fontWeight: "800" as const, letterSpacing: -0.3 },
  sectionTitle: { fontSize: 18, fontWeight: "700" as const },
  cardTitle: { fontSize: 16, fontWeight: "700" as const },
  body: { fontSize: 14, fontWeight: "400" as const, lineHeight: 20 },
  bodyBold: { fontSize: 14, fontWeight: "600" as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: "500" as const },
  label: { fontSize: 11, fontWeight: "700" as const, letterSpacing: 0.5, textTransform: "uppercase" as const },
  price: { fontSize: 18, fontWeight: "800" as const },
  priceLarge: { fontSize: 24, fontWeight: "800" as const },
  stat: { fontSize: 28, fontWeight: "800" as const },
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
