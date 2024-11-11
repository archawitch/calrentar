import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type AuthInputProp = {
  label: string;
  inputText: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
};

const AuthInput = (props: AuthInputProp) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  const getVisibilityBtn = () => {
    if (!props.secureTextEntry) return;

    let iconName: any;
    if (isPasswordHidden) {
      iconName = "visibility-off";
    } else {
      iconName = "visibility";
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
        <View>
          <MaterialIcons name={iconName} size={20} color="#CCCCCC" />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry && isPasswordHidden}
          value={props.inputText}
        />
        {getVisibilityBtn()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 17,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    paddingVertical: 16,
  },
});

export default AuthInput;
