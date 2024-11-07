import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import React from "react";

type CarPropertyProp = {
  iconName: any;
  title: string;
};

const CarProperty = (props: CarPropertyProp) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialIcons name={props.iconName} size={40} color="#2B2930" />
      </View>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    alignItems: "center",
  },
  card: {
    padding: 16,
    backgroundColor: "#FAFAFC",
    borderRadius: 10,
  },
  text: {
    color: "#A1A1A6",
  },
});

export default CarProperty;
