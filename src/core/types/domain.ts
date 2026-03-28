export type UserRole = "buyer" | "merchant";

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "preparing"
  | "readyForPickup"
  | "pickedUp"
  | "inTransit"
  | "delivered"
  | "disputed"
  | "cancelled";

export interface AppProfile {
  id: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface MarketplaceCard {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  merchantId: string;
  merchantName: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  etaMinutes: number;
  trustScore: number;
  inStock: boolean;
}

export interface CartItem {
  listingId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  merchantName: string;
}

export interface EscrowState {
  orderId: string;
  state: "pending" | "held" | "released" | "refundPending" | "refunded";
  amount: number;
}

export interface Order {
  id: string;
  buyerId: string;
  merchantId: string;
  merchantName: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  total: number;
  escrow: EscrowState;
  createdAt: string;
  updatedAt: string;
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

export interface Review {
  id: string;
  orderId: string;
  merchantId: string;
  buyerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface MerchantProduct {
  id: string;
  merchantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  inventory: number;
  isActive: boolean;
}

export interface PromotionOption {
  type: "storeBoost" | "productBoost" | "featuredPlacement";
  label: string;
  description: string;
  priceETB: number;
  durationDays: number;
}
