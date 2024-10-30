import React from "react";
import { View, Image, StyleSheet } from "react-native";
import styles from "../styles/styles";

interface StarsProps {
  stars: number;
}

const Stars: React.FC<StarsProps> = ({ stars }) => {
  if (stars === 1) {
    return (
      <View style={stars > 1 ? styles.star_container : undefined}>
        <Image
          source={require("../images/1-star.png")}
          style={styles.star_img}
        />
      </View>
    );
  } else if (stars === 2) {
    return (
      <View style={styles.star_container}>
        <Image
          source={require("../images/2-star.png")}
          style={styles.star_img}
        />
      </View>
    );
  } else if (stars === 3) {
    return (
      <View style={styles.star_container}>
        <Image
          source={require("../images/3-star.png")}
          style={styles.star_img}
        />
      </View>
    );
  } else if (stars === 4) {
    return (
      <View style={styles.star_container}>
        <Image
          source={require("../images/4-star.png")}
          style={styles.star_img}
        />
      </View>
    );
  } else if (stars === 5) {
    return (
      <View style={styles.star_container}>
        <Image
          source={require("../images/5-star.png")}
          style={styles.star_img}
        />
      </View>
    );
  }
  return null;
};

export default Stars;
