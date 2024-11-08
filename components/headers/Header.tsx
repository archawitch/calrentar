import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type HeaderProp = {
  title: string;
  goBack?: ((event: GestureResponderEvent) => void) | undefined;
};

const Header = (props: HeaderProp) => {
  return (
    <View style={styles.container}>
      {props.goBack !== undefined && (
        <TouchableWithoutFeedback onPress={props.goBack}>
          <View>
            <MaterialIcons name="arrow-back" size={26} />
          </View>
        </TouchableWithoutFeedback>
      )}
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  text: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
  },
});

export default Header;
