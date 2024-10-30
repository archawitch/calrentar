import React from "react";
import { View, Text } from "react-native";
import Stars from "./Stars";

interface StarWithAverageProps {
  stars: number;
}

const StarWithAverage: React.FC<StarWithAverageProps> = ({ stars }) => {
  const stars_int = Math.round(stars);
  const stars2decimal = stars.toFixed(2);
  return (
    <View>
      <Text>Average star: {stars2decimal}</Text>
      <Stars stars={stars_int} />
    </View>
  );
};

export default StarWithAverage;
