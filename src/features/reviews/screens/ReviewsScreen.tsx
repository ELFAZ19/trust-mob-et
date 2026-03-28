import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TamagnScreen } from "../../../components/TamagnScreen";
import { SectionCard } from "../../../components/SectionCard";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow, GRADIENT_PRIMARY } from "../../../core/theme/tokens";
import { MOCK_REVIEWS } from "../../../data/mock";

export function ReviewsScreen({ navigation }: { navigation: any }): JSX.Element {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  function handleSubmit() {
    if (rating === 0) { Alert.alert("Error", "Please select a rating"); return; }
    Alert.alert("Thank You!", "Your review helps build a trustworthy community.");
    setRating(0);
    setComment("");
  }

  return (
    <TamagnScreen title="Reviews" onBack={() => navigation.goBack()}>
      {/* Write Review */}
      <SectionCard title="Write a Review" accent={tamagnColors.primary}>
        <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: tamagnSpacing.sm }}>YOUR RATING</Text>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: tamagnSpacing.md }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} onPress={() => setRating(star)} style={{ padding: 4 }}>
              <Text style={{ fontSize: 28, color: star <= rating ? tamagnColors.tertiary : tamagnColors.surfaceContainerHigh }}>★</Text>
            </Pressable>
          ))}
        </View>

        <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: tamagnSpacing.xs }}>YOUR FEEDBACK</Text>
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Share your experience..."
          placeholderTextColor={tamagnColors.outlineVariant}
          multiline
          numberOfLines={3}
          style={{
            backgroundColor: tamagnColors.surfaceContainerLow,
            borderRadius: tamagnRadius.md,
            padding: tamagnSpacing.md,
            minHeight: 80,
            fontSize: 14,
            color: tamagnColors.onSurface,
            textAlignVertical: "top",
            marginBottom: tamagnSpacing.md,
          }}
        />

        <Pressable onPress={handleSubmit}>
          <LinearGradient
            colors={[...GRADIENT_PRIMARY]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: tamagnRadius.md, paddingVertical: 14, alignItems: "center" }}
          >
            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 14 }}>Submit Review</Text>
          </LinearGradient>
        </Pressable>
      </SectionCard>

      {/* Past Reviews */}
      <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, marginBottom: tamagnSpacing.sm }}>Your Reviews</Text>
      {MOCK_REVIEWS.map((review) => (
        <View key={review.id} style={{ backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.xl, padding: tamagnSpacing.md, marginBottom: tamagnSpacing.sm, ...tamagnShadow }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
            <View>
              <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>{review.product}</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{review.merchantName}</Text>
            </View>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.outlineVariant }}>{review.date}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Text key={s} style={{ fontSize: 14, color: s <= review.rating ? tamagnColors.tertiary : tamagnColors.surfaceContainerHigh }}>★</Text>
            ))}
          </View>
          <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface }}>{review.comment}</Text>
        </View>
      ))}
    </TamagnScreen>
  );
}
