import { useEffect, useState } from "react";
import { supabaseClient } from "../../core/api/supabaseClient";
import type { DeliveryEvent } from "../../core/types/domain";

const initialEvents: DeliveryEvent[] = [
  { id: "1", orderId: "demo-order", status: "placed", timestamp: new Date().toISOString() },
  { id: "2", orderId: "demo-order", status: "confirmed", timestamp: new Date().toISOString() }
];

export function useDeliveryTimeline(orderId: string) {
  const [events, setEvents] = useState<DeliveryEvent[]>(initialEvents);
  const [isPollingFallback, setIsPollingFallback] = useState(false);

  useEffect(() => {
    const channel = supabaseClient
      .channel(`delivery:${orderId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "delivery_events", filter: `order_id=eq.${orderId}` },
        (payload) => {
          const record = payload.new as DeliveryEvent;
          setEvents((existing) => [...existing, record]);
        }
      )
      .subscribe((status) => {
        if (status === "TIMED_OUT" || status === "CHANNEL_ERROR") {
          setIsPollingFallback(true);
        }
      });

    let interval: ReturnType<typeof setInterval> | undefined;
    if (isPollingFallback) {
      interval = setInterval(async () => {
        const { data } = await supabaseClient
          .from("delivery_events")
          .select("*")
          .eq("order_id", orderId)
          .order("timestamp", { ascending: true });
        if (data) {
          setEvents(data as DeliveryEvent[]);
        }
      }, 10_000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      supabaseClient.removeChannel(channel);
    };
  }, [isPollingFallback, orderId]);

  return { events, isPollingFallback };
}
