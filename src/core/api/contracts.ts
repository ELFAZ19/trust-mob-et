export const supabaseContracts = {
  tables: {
    profiles: "profiles",
    addresses: "addresses",
    merchants: "merchants",
    products: "merchant_products",
    orders: "orders",
    orderItems: "order_items",
    escrowTransactions: "escrow_transactions",
    deliveryEvents: "delivery_events",
    reviews: "reviews",
    trustMetrics: "merchant_trust_metrics",
    promotions: "promotion_orders",
  },
  functions: {
    createOrder: "create-order",
    initiateMpesa: "initiate-mpesa-payment",
    updateEscrow: "update-escrow-status",
    releaseEscrow: "release-escrow",
    purchaseBoost: "purchase-boost",
  },
  realtimeChannels: {
    order: (orderId: string) => `orders:${orderId}`,
    delivery: (orderId: string) => `delivery:${orderId}`,
    merchantOrders: (merchantId: string) => `merchant:${merchantId}:orders`,
  },
} as const;
