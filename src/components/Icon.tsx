import React from "react";
import Svg, { Path, Circle, Rect, G, Line, Polyline } from "react-native-svg";

export type IconName =
  | "home" | "search" | "cart" | "orders" | "profile"
  | "dashboard" | "catalog" | "analytics" | "promote"
  | "back" | "forward" | "close" | "check" | "plus" | "minus"
  | "star" | "star-outline" | "star-half"
  | "location" | "clock" | "distance"
  | "shield" | "verified" | "trust"
  | "bell" | "settings" | "lock" | "eye" | "eye-off"
  | "phone" | "mail" | "user" | "store" | "heart" | "heart-outline"
  | "filter" | "sort" | "grid" | "list"
  | "package" | "truck" | "wallet" | "credit-card"
  | "camera" | "image" | "edit" | "trash"
  | "chevron-right" | "chevron-down" | "chevron-up"
  | "info" | "help" | "warning" | "error"
  | "moon" | "sun" | "logout" | "share"
  | "trending" | "chart" | "receipt" | "tag" | "gift"
  | "coffee" | "food" | "electronics" | "clothing" | "tools"
  | "mpesa" | "arrow-up" | "arrow-down" | "refresh"
  | "add-cart";

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, color = "#1a1c1c", strokeWidth = 2 }: IconProps): JSX.Element {
  const sw = strokeWidth;
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none" };

  switch (name) {
    case "home":
      return <Svg {...props}><Path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "search":
      return <Svg {...props}><Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={sw} /><Path d="M21 21l-4.35-4.35" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "cart":
      return <Svg {...props}><Path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /><Path d="M3 6h18" stroke={color} strokeWidth={sw} /><Path d="M16 10a4 4 0 01-8 0" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "add-cart":
      return <Svg {...props}><Path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /><Circle cx="9" cy="21" r="1" fill={color} /><Circle cx="20" cy="21" r="1" fill={color} /><Path d="M12 9h6M15 6v6" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "orders":
    case "package":
      return <Svg {...props}><Path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /><Path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "profile":
    case "user":
      return <Svg {...props}><Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /><Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={sw} /></Svg>;
    case "dashboard":
      return <Svg {...props}><Rect x="3" y="3" width="7" height="9" rx="1" stroke={color} strokeWidth={sw} /><Rect x="14" y="3" width="7" height="5" rx="1" stroke={color} strokeWidth={sw} /><Rect x="14" y="12" width="7" height="9" rx="1" stroke={color} strokeWidth={sw} /><Rect x="3" y="16" width="7" height="5" rx="1" stroke={color} strokeWidth={sw} /></Svg>;
    case "catalog":
      return <Svg {...props}><Path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke={color} strokeWidth={sw} strokeLinecap="round" /><Path d="M9 12h6M9 16h6" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "analytics":
    case "chart":
      return <Svg {...props}><Path d="M18 20V10M12 20V4M6 20v-6" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "promote":
    case "trending":
      return <Svg {...props}><Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "back":
      return <Svg {...props}><Path d="M19 12H5M12 19l-7-7 7-7" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "forward":
      return <Svg {...props}><Path d="M5 12h14M12 5l7 7-7 7" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "close":
      return <Svg {...props}><Path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "check":
      return <Svg {...props}><Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "plus":
      return <Svg {...props}><Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "minus":
      return <Svg {...props}><Path d="M5 12h14" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "star":
      return <Svg {...props}><Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={color} stroke={color} strokeWidth={sw} strokeLinejoin="round" /></Svg>;
    case "star-outline":
      return <Svg {...props}><Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={color} strokeWidth={sw} strokeLinejoin="round" /></Svg>;
    case "location":
      return <Svg {...props}><Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth={sw} /><Circle cx="12" cy="10" r="3" stroke={color} strokeWidth={sw} /></Svg>;
    case "clock":
      return <Svg {...props}><Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={sw} /><Path d="M12 6v6l4 2" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "distance":
      return <Svg {...props}><Path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "shield":
    case "trust":
      return <Svg {...props}><Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth={sw} strokeLinejoin="round" /></Svg>;
    case "verified":
      return <Svg {...props}><Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth={sw} strokeLinejoin="round" /><Path d="M9 12l2 2 4-4" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "bell":
      return <Svg {...props}><Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "settings":
      return <Svg {...props}><Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={sw} /><Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth={sw} /></Svg>;
    case "lock":
      return <Svg {...props}><Rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth={sw} /><Path d="M7 11V7a5 5 0 0110 0v4" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "phone":
      return <Svg {...props}><Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke={color} strokeWidth={sw} /></Svg>;
    case "store":
      return <Svg {...props}><Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /><Path d="M9 22V12h6v10" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "heart":
      return <Svg {...props}><Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill={color} stroke={color} strokeWidth={sw} /></Svg>;
    case "heart-outline":
      return <Svg {...props}><Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth={sw} /></Svg>;
    case "filter":
      return <Svg {...props}><Path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "truck":
      return <Svg {...props}><Path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /><Circle cx="5.5" cy="18.5" r="2.5" stroke={color} strokeWidth={sw} /><Circle cx="18.5" cy="18.5" r="2.5" stroke={color} strokeWidth={sw} /></Svg>;
    case "wallet":
      return <Svg {...props}><Path d="M21 12V7H5a2 2 0 010-4h14v4" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /><Path d="M3 5v14a2 2 0 002 2h16v-5" stroke={color} strokeWidth={sw} /><Path d="M18 12a2 2 0 100 4h4v-4h-4z" stroke={color} strokeWidth={sw} /></Svg>;
    case "credit-card":
      return <Svg {...props}><Rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke={color} strokeWidth={sw} /><Path d="M1 10h22" stroke={color} strokeWidth={sw} /></Svg>;
    case "camera":
      return <Svg {...props}><Path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke={color} strokeWidth={sw} /><Circle cx="12" cy="13" r="4" stroke={color} strokeWidth={sw} /></Svg>;
    case "image":
      return <Svg {...props}><Rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth={sw} /><Circle cx="8.5" cy="8.5" r="1.5" fill={color} /><Path d="M21 15l-5-5L5 21" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "edit":
      return <Svg {...props}><Path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={color} strokeWidth={sw} /><Path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth={sw} /></Svg>;
    case "trash":
      return <Svg {...props}><Path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "chevron-right":
      return <Svg {...props}><Path d="M9 18l6-6-6-6" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "chevron-down":
      return <Svg {...props}><Path d="M6 9l6 6 6-6" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "chevron-up":
      return <Svg {...props}><Path d="M18 15l-6-6-6 6" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "info":
      return <Svg {...props}><Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={sw} /><Path d="M12 16v-4M12 8h.01" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "help":
      return <Svg {...props}><Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={sw} /><Path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke={color} strokeWidth={sw} strokeLinecap="round" /><Path d="M12 17h.01" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "warning":
      return <Svg {...props}><Path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "moon":
      return <Svg {...props}><Path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={color} strokeWidth={sw} /></Svg>;
    case "logout":
      return <Svg {...props}><Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "share":
      return <Svg {...props}><Circle cx="18" cy="5" r="3" stroke={color} strokeWidth={sw} /><Circle cx="6" cy="12" r="3" stroke={color} strokeWidth={sw} /><Circle cx="18" cy="19" r="3" stroke={color} strokeWidth={sw} /><Path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke={color} strokeWidth={sw} /></Svg>;
    case "receipt":
      return <Svg {...props}><Path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" stroke={color} strokeWidth={sw} /><Path d="M8 10h8M8 14h4" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "tag":
      return <Svg {...props}><Path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke={color} strokeWidth={sw} strokeLinejoin="round" /><Circle cx="7" cy="7" r="1" fill={color} /></Svg>;
    case "gift":
      return <Svg {...props}><Path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "coffee":
      return <Svg {...props}><Path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "food":
      return <Svg {...props}><Path d="M18 8A6 6 0 006 8M3 8h18l-1.5 11.5a2 2 0 01-2 1.5H6.5a2 2 0 01-2-1.5L3 8z" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /><Path d="M12 4v4" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "electronics":
      return <Svg {...props}><Rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke={color} strokeWidth={sw} /><Path d="M8 21h8M12 17v4" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "clothing":
      return <Svg {...props}><Path d="M6.5 2L2 6l3 1.5V20a2 2 0 002 2h10a2 2 0 002-2V7.5L22 6l-4.5-4H15a3 3 0 01-6 0H6.5z" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "tools":
      return <Svg {...props}><Path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "mpesa":
      return <Svg {...props}><Rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth={sw} /><Path d="M7 15V9h2l2 3 2-3h2v6" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "arrow-up":
      return <Svg {...props}><Path d="M12 19V5M5 12l7-7 7 7" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "arrow-down":
      return <Svg {...props}><Path d="M12 5v14M19 12l-7 7-7-7" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
    case "refresh":
      return <Svg {...props}><Path d="M23 4v6h-6M1 20v-6h6" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /><Path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "eye":
      return <Svg {...props}><Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth={sw} /><Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={sw} /></Svg>;
    case "eye-off":
      return <Svg {...props}><Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "mail":
      return <Svg {...props}><Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={sw} /><Path d="M22 6l-10 7L2 6" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "sort":
      return <Svg {...props}><Path d="M3 6h18M3 12h12M3 18h6" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "grid":
      return <Svg {...props}><Rect x="3" y="3" width="7" height="7" stroke={color} strokeWidth={sw} rx="1" /><Rect x="14" y="3" width="7" height="7" stroke={color} strokeWidth={sw} rx="1" /><Rect x="3" y="14" width="7" height="7" stroke={color} strokeWidth={sw} rx="1" /><Rect x="14" y="14" width="7" height="7" stroke={color} strokeWidth={sw} rx="1" /></Svg>;
    case "list":
      return <Svg {...props}><Path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "error":
      return <Svg {...props}><Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={sw} /><Path d="M15 9l-6 6M9 9l6 6" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    case "sun":
      return <Svg {...props}><Circle cx="12" cy="12" r="5" stroke={color} strokeWidth={sw} /><Path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
    default:
      return <Svg {...props}><Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={sw} /><Path d="M12 8v4M12 16h.01" stroke={color} strokeWidth={sw} strokeLinecap="round" /></Svg>;
  }
}
