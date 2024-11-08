import { View, Text, StyleSheet, Image } from "react-native";

import ImageContain from "@components/images/ImageContain";

type CardCarRentProp = {
  image: any;
  logo: any;
  model: string;
};

const CardCarModel = (props: CardCarRentProp) => {
  return (
    <View style={styles.card}>
      <ImageContain source={props.image} />
      <View style={styles.textContainer}>
        <Image style={styles.logo} source={props.logo} />
        <Text style={styles.text}>{props.model}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingTop: 12,
    paddingBottom: 18,
    backgroundColor: "#FAFAFC",
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 32,
    height: 32,
  },
  text: {
    fontSize: 16,
  },
});

export default CardCarModel;
