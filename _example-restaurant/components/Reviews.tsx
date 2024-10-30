import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import Stars from "./Stars";
import { Review } from "../types/types";

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ fontSize: 16 }}>Reviews</Text>
      </View>
      <ScrollView>
        {reviews.map((review, i) => (
          <View key={i}>
            <Text>{review.comment}</Text>
            <Stars stars={parseInt(review.stars.toString(), 10)} />
          </View>
        ))}
        {/* Workaround for ScrollView cutoff at the bottom */}
        <Image source={require("../images/bottom_filler.png")} />
      </ScrollView>
    </View>
  );
};

export default Reviews;
