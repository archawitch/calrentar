import { View, StyleSheet } from "react-native";

import React from "react";

type CardCarProp = {
  image: React.ReactNode;
  header: React.ReactNode;
  button: React.ReactNode;
};

const CardCar = (props: CardCarProp) => {
  return (
    <View style={styles.card}>
      {props.header}
      {props.image}
      {props.button}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
});

export default CardCar;
