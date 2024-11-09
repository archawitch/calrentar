import {
  Text,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type ButtonLargeProp = {
  title: string;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const ButtonLarge = (props: ButtonLargeProp) => {
  if (props.disabled) {
    return (
      <TouchableWithoutFeedback>
        <View style={[styles.button, { backgroundColor: "#CCCCCC" }]}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: !props.disabled ? "#2B2930" : "#CCCCCC" },
      ]}
      onPress={props.onPress}>
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
