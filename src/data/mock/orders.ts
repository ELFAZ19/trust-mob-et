export interface MockBuyerOrder {
  id: string;
  items: string;
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  merchantName: string;
}

export const MOCK_BUYER_ORDERS: MockBuyerOrder[] = [
  { id: "ORD-1001", items: "Sidama Coffee × 2, Fresh Injera Pack × 1", total: 1080, status: "shipped", date: "Mar 27, 2026", merchantName: "Harar Beans" },
  { id: "ORD-1002", items: "Samsung Galaxy A55", total: 18500, status: "processing", date: "Mar 26, 2026", merchantName: "NextGen Electronics" },
  { id: "ORD-1003", items: "Berbere Spice Mix × 3", total: 750, status: "delivered", date: "Mar 24, 2026", merchantName: "Merkato Finest" },
  { id: "ORD-1004", items: "Handwoven Shemma", total: 1200, status: "delivered", date: "Mar 20, 2026", merchantName: "Dorze Weavers" },
];

export interface MockMerchantOrder {
  id: string;
  buyer: string;
  items: string;
  total: number;
  status: "pending" | "preparing" | "shipped" | "delivered";
  date: string;
}

export const MOCK_MERCHANT_ORDERS: MockMerchantOrder[] = [
  { id: "ORD-2001", buyer: "Elias M.", items: "Sidama Coffee × 3", total: 1350, status: "pending", date: "Mar 28, 2026" },
  { id: "ORD-2002", buyer: "Sara T.", items: "Berbere Spice × 2", total: 500, status: "preparing", date: "Mar 27, 2026" },
  { id: "ORD-2003", buyer: "Abiy K.", items: "Honey (Wild)", total: 380, status: "shipped", date: "Mar 26, 2026" },
  { id: "ORD-2004", buyer: "Hana B.", items: "Injera Pack × 4", total: 720, status: "delivered", date: "Mar 25, 2026" },
  { id: "ORD-2005", buyer: "Dawit G.", items: "Handwoven Shemma", total: 1200, status: "delivered", date: "Mar 24, 2026" },
];

export const ORDER_DETAIL_STEPS = [
  { label: "Order Placed", done: true, date: "Mar 27, 10:30 AM" },
  { label: "Confirmed", done: true, date: "Mar 27, 10:45 AM" },
  { label: "Preparing", done: true, date: "Mar 27, 11:00 AM" },
  { label: "Shipped", done: true, date: "Mar 27, 12:15 PM" },
  { label: "Delivered", done: false, date: "" },
];

export const ORDER_DETAIL_ITEMS = [
  { name: "Sidama Coffee", qty: 2, price: 450 },
  { name: "Fresh Injera Pack", qty: 1, price: 180 },
];

export const MERCHANT_ORDER_STATUS_FLOW: MockMerchantOrder["status"][] = ["pending", "preparing", "shipped", "delivered"];
