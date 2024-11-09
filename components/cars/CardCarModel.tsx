import { View, Text, StyleSheet, Image } from "react-native";

import ImageContain from "@components/images/ImageContain";
import { CarData } from "@appTypes/cars/carTypes";

type CardCarRentProp = {
  carData: CarData;
};

const CardCarModel = (props: CardCarRentProp) => {
  // TODO: Get car image (front) by id
  const getCarImage = (id: number) => {
    // Mock up
    return require("@assets/images/illustrations/signup-illustration.png");
  };

  // TODO: Get car logo by make
  const getCarLogo = (make: string) => {
    // Mock up
    return require("@assets/images/illustrations/login-illustration.png");
  };

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
    gap: 10,
  },
  logo: {
    width: 32,
    height: 32,
  },
  text: {
    fontSize: 18,
  },
});

export default CardCarModel;
