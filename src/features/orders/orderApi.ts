import { supabaseClient } from "../../core/api/supabaseClient";
import type { EscrowState } from "../../core/types/domain";

export interface LegacyCartItem {
  listingId: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderSummary {
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  total: number;
}

export function calculateOrderSummary(items: LegacyCartItem[]): OrderSummary {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 80 : 0;
  const platformFee = Math.round(subtotal * 0.02);
  const total = subtotal + deliveryFee + platformFee;
  return { subtotal, deliveryFee, platformFee, total };
}

export async function createOrderWithEscrow(
  buyerId: string,
  items: LegacyCartItem[]
): Promise<{ orderId: string; escrow: EscrowState }> {
  const summary = calculateOrderSummary(items);
  try {
    const { data, error } = await supabaseClient.functions.invoke("create-order", {
      body: { buyerId, items, summary }
    });
    if (error || !data) throw new Error("Backend unavailable");
    return data as { orderId: string; escrow: EscrowState };
  } catch {
    const fallbackOrderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    return {
      orderId: fallbackOrderId,
      escrow: { orderId: fallbackOrderId, state: "pending", amount: summary.total }
    };
  }
}
