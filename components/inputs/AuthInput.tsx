import { View, Text, TextInput, StyleSheet } from "react-native";

type AuthInputProp = {
  label: string;
  inputText: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
};

const AuthInput = (props: AuthInputProp) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}>
        {props.inputText}
      </TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
  },
  input: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 16,
  },
});

export default AuthInput;
