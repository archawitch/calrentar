import { View, Text, StyleSheet, GestureResponderEvent } from "react-native";
import Input from "./Input";

type LabelInputProp = {
  label: string;
  value?: string;
  iconName?: any;
  inputMode?: any;
  placeholder?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  onChangeText?: (text: string) => void;
};

const LabelInput = (props: LabelInputProp) => {
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <Input
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        inputMode={props.inputMode ? props.inputMode : "text"}
        editable={props.editable}
        value={props.value}
        onPress={props.onPress}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 18, paddingBottom: 10 },
});

export default LabelInput;
