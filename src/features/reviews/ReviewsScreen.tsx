import React, { useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { supabaseClient } from "../../core/api/supabaseClient";

export function ReviewsScreen(): JSX.Element {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("Reliable service and quick delivery.");

  async function submitReview() {
    const payload = {
      merchant_id: "merchant-demo",
      order_id: "demo-order",
      rating,
      comment
    };
    await supabaseClient.from("reviews").insert(payload);
    Alert.alert("Review Submitted", "Thanks for contributing to merchant trust score.");
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>Ratings and Reviews</Text>

      <SectionCard title="Submit Review">
        <Text>Star rating: {rating}</Text>
        <TextInput
          value={comment}
          onChangeText={setComment}
          multiline
          style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginTop: 8 }}
        />
        <Button title="Increase Star" onPress={() => setRating((prev) => Math.min(5, prev + 1))} />
        <Button title="Decrease Star" onPress={() => setRating((prev) => Math.max(1, prev - 1))} />
        <Button title="Submit" onPress={submitReview} />
      </SectionCard>
    </ScrollView>
  );
}
