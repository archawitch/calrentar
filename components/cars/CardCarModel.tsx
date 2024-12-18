import { View, Text, StyleSheet, Image } from "react-native";

import ImageContain from "@components/images/ImageContain";

import { Car } from "@appTypes/cars/carTypes";

import { getCarLogo } from "@services/homeServices";
import { getCarImage } from "@services/carDetailServices";

type CardCarRentProp = {
  carData: Car;
};

const CardCarModel = (props: CardCarRentProp) => {
  return (
    <View style={styles.card}>
      <ImageContain source={getCarImage(props.carData.id)} />
      <View style={styles.textContainer}>
        <Image style={styles.logo} source={getCarLogo(props.carData.make)} />
        <Text style={styles.text}>{props.carData.model}</Text>
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
    paddingTop: 4,
    gap: 10,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: "contain"
  },
  text: {
    fontSize: 18,
  },
});

export default CardCarModel;
