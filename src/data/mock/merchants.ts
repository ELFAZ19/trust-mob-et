export interface MockMerchant {
  name: string;
  rating: number;
  distance: string;
  verified: boolean;
  img: "grocery" | "electronics" | "cafe" | "market" | "spiceshop";
}

export const MOCK_MERCHANTS: MockMerchant[] = [
  { name: "Bole Central Grocery", rating: 4.8, distance: "1.2km", verified: true, img: "grocery" },
  { name: "NextGen Electronics", rating: 4.9, distance: "0.5km", verified: true, img: "electronics" },
  { name: "Ethio Roast Coffee", rating: 4.7, distance: "2.3km", verified: false, img: "cafe" },
];

export const MERCHANT_QUICK_ACTIONS = [
  { icon: "📋", label: "Catalog", screen: "Catalog" },
  { icon: "📈", label: "Analytics", screen: "Analytics" },
  { icon: "🚀", label: "Promote", screen: "Promotions" },
  { icon: "📦", label: "Orders", screen: "MerchantOrders" },
];

export const MERCHANT_RECENT_ORDERS = [
  { id: "ORD-2001", buyer: "Elias M.", items: "Sidama Coffee × 3", total: 1350, status: "New", statusColor: "#904d00" },
  { id: "ORD-2002", buyer: "Sara T.", items: "Berbere Spice × 2", total: 500, status: "Shipped", statusColor: "#2196F3" },
  { id: "ORD-2003", buyer: "Abiy K.", items: "Honey (Wild)", total: 380, status: "Delivered", statusColor: "#016e00" },
];
