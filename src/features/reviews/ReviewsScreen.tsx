import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnButton } from "../../components/TamagnButton";
import { TamagnScreen } from "../../components/TamagnScreen";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";
import type { Review } from "../../core/types/domain";

const existingReviews: Review[] = [
  { id: "r1", orderId: "ORD-1000", merchantId: "m3", buyerName: "Abebe T.", rating: 5, comment: "Excellent coffee, very fast delivery!", createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "r2", orderId: "ORD-0999", merchantId: "m1", buyerName: "Sara M.", rating: 4, comment: "Good injera, packaging could be better.", createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export function ReviewsScreen(): JSX.Element {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(existingReviews);

  function handleSubmit() {
    if (!comment.trim()) {
      Alert.alert("Please add a comment");
      return;
    }
    const newReview: Review = {
      id: `r-${Date.now()}`,
      orderId: "latest",
      merchantId: "m1",
      buyerName: "You",
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };
    setReviews([newReview, ...reviews]);
    setComment("");
    setRating(5);
    Alert.alert("Review Submitted", "Thanks for contributing to merchant trust scores!");
  }

  return (
    <TamagnScreen title="Reviews" subtitle="Rate your experience">
      {/* Submit Review */}
      <SectionCard title="Write a Review">
        <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: 8 }}>YOUR RATING</Text>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: tamagnSpacing.md }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} onPress={() => setRating(star)}>
              <Text style={{ fontSize: 28 }}>{star <= rating ? "⭐" : "☆"}</Text>
            </Pressable>
          ))}
        </View>
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Share your experience..."
          placeholderTextColor={tamagnColors.outlineVariant}
          multiline
          style={{
            backgroundColor: tamagnColors.surfaceContainerLow,
            borderRadius: tamagnRadius.md,
            padding: 12,
            fontSize: 14,
            color: tamagnColors.onSurface,
            minHeight: 80,
            textAlignVertical: "top",
            marginBottom: tamagnSpacing.md,
          }}
        />
        <TamagnButton title="Submit Review" onPress={handleSubmit} />
      </SectionCard>

      {/* Past Reviews */}
      <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, marginBottom: tamagnSpacing.sm }}>Recent Reviews</Text>
      {reviews.map((review) => (
        <SectionCard key={review.id}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>{review.buyerName}</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>
              {new Date(review.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 2, marginVertical: 4 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Text key={i} style={{ fontSize: 14 }}>{i < review.rating ? "⭐" : "☆"}</Text>
            ))}
          </View>
          <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface }}>{review.comment}</Text>
        </SectionCard>
      ))}
    </TamagnScreen>
  );
}
