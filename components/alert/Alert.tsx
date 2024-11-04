import React, { useMemo } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type AlertType = "auth" | "notify";
type IconType = {
  auth: { success: any; failure: any };
  notify: { success: any; failure: any };
};
type SuccessAlertProp = {
  type: AlertType;
  isSuccess: boolean;
  title: string;
  details: string;
};

const icons: IconType = {
  auth: {
    success: require("@assets/icons/car-success.png"),
    failure: require("@assets/icons/car-failure.png"),
  },
  notify: {
    success: require("@assets/icons/success.png"),
    failure: require("@assets/icons/failure.png"),
  },
};

const getIcon = (type: AlertType, result: boolean) => {
  return icons[type][result ? "success" : "failure"] || null;
};

const Alert: React.FC<SuccessAlertProp> = ({
  type,
  isSuccess,
  title,
  details,
}) => {
  const icon = useMemo(() => getIcon(type, isSuccess), [type, isSuccess]);

  return (
    <View style={styles.container}>
      {icon && <Image style={styles.icon} source={icon} />}
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
  icon: {
    width: 96,
    height: 85,
    marginBottom: 24,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    marginBottom: 8,
  },
  details: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "#A1A1A6",
  },
});

export default Alert;
