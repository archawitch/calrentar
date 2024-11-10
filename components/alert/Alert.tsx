import React, { useMemo } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type AlertType = "auth" | "notify";
type IconNameType = {
  auth: {
    success: any;
    failure: any;
    size: number;
  };
  notify: {
    success: any;
    failure: any;
    size: number;
  };
};
type AlertProp = {
  type: AlertType;
  isSuccess: boolean;
  title: string;
  details: string;
};

const icons: IconNameType = {
  auth: {
    success: "directions-car",
    failure: "directions-car",
    size: 120,
  },
  notify: {
    success: "verified",
    failure: "new-releases",
    size: 84,
  },
};

const getIcon = (type: AlertType, result: boolean) => {
  return {
    iconName: icons[type][result ? "success" : "failure"] || null,
    iconSize: icons[type].size,
  };
};

const Alert: React.FC<AlertProp> = ({ type, isSuccess, title, details }) => {
  const { iconName, iconSize } = useMemo(
    () => getIcon(type, isSuccess),
    [type, isSuccess]
  );

  return (
    <View style={styles.container}>
      {iconName && (
        <MaterialIcons
          name={iconName}
          color={isSuccess ? "#23E9B4" : "#FF5A5A"}
          size={iconSize}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    marginTop: 12,
    marginBottom: 8,
  },
  details: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "#A1A1A6",
  },
});

export default Alert;
