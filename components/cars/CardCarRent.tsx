import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TouchableWithoutFeedback,
} from "react-native";

import React from "react";

type CardCarRentProp = {
  image: React.ReactNode;
  header: React.ReactNode;
  button: React.ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const CardCarRent = (props: CardCarRentProp) => {
  return (
    <View style={styles.card}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View>
          {props.header}
          {props.image}
          {props.button}
        </View>
      </TouchableWithoutFeedback>
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

export default CardCarRent;
