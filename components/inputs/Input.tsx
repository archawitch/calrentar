import {
  View,
  TextInput,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type InputProp = {
  value?: string;
  iconName?: any;
  inputMode?: any;
  placeholder?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  onChangeText?: (text: string) => void;
};

const Input = (props: InputProp) => {
  return (
    <View style={styles.container}>
      {props.iconName && (
        <MaterialIcons name={props.iconName} size={18} color="#A1A1A6" />
      )}
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        inputMode={props.inputMode ? props.inputMode : "text"}
        editable={props.editable}
        selectTextOnFocus={props.editable}
        value={props.value}
        onPress={props.onPress}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: 8,
    padding: 10,
    gap: 4,
  },
  input: {
    fontSize: 16,
    flex: 1,
    paddingLeft: 6,
  },
});

export default Input;
