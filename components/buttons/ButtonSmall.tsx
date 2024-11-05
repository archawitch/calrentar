import {
  Text,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";

type ButtonSmallProp = {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const ButtonSmall = (props: ButtonSmallProp) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#2B2930",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "white",
  },
});

export default ButtonSmall;
