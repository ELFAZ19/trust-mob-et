export type UserRole = "buyer" | "merchant" | "serviceProvider" | "admin";

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "pickupScheduled"
  | "itemCollected"
  | "inTransit"
  | "delivered"
  | "disputed";

export interface AppProfile {
  id: string;
  fullName: string;
  phone?: string;
  role: UserRole;
}

export interface MarketplaceCard {
  id: string;
  type: "product" | "service";
  title: string;
  description: string;
  priceLabel: string;
  merchantName: string;
  rating: number;
  distanceKm: number;
  etaMinutes: number;
}

export interface CartItem {
  listingId: string;
  quantity: number;
  unitPrice: number;
}

export interface EscrowState {
  orderId: string;
  state: "pending" | "held" | "released" | "refundPending" | "refunded";
  amount: number;
}

export interface DeliveryEvent {
  id: string;
  orderId: string;
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface MerchantTrustMetrics {
  merchantId: string;
  trustScore: number;
  completionRate: number;
  averageRating: number;
  complaintRate: number;
}
