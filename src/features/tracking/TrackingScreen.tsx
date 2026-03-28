import React from "react";
import { Text } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnScreen } from "../../components/TamagnScreen";
import { useDeliveryTimeline } from "./useDeliveryTimeline";

export function TrackingScreen(): JSX.Element {
  const { events, isPollingFallback } = useDeliveryTimeline("demo-order");

  return (
    <TamagnScreen title="Order Tracking" subtitle="Live delivery progress and courier updates.">
      {isPollingFallback ? (
        <SectionCard title="Connection Notice" subtitle="Realtime unstable">
          <Text>Using safe polling fallback every 10 seconds.</Text>
        </SectionCard>
      ) : null}

      <SectionCard title="Delivery Timeline">
        {events.map((event) => (
          <Text key={`${event.orderId}-${event.id}`}>
            {event.status} • {new Date(event.timestamp).toLocaleString()}
          </Text>
        ))}
      </SectionCard>
    </TamagnScreen>
  );
}
