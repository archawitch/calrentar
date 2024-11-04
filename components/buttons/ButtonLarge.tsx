import {
  Text,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";

type ButtonLargeProp = {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const ButtonLarge = (props: ButtonLargeProp) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 17,
    borderRadius: 10,
    backgroundColor: "#2B2930",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "white",
  },
});

export default ButtonLarge;
