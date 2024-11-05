import { Text, StyleSheet } from "react-native";

type SubHeaderProp = {
  title: string;
};

const SubHeader = (props: SubHeaderProp) => {
  return <Text style={styles.text}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    marginTop: 16,
  },
});

export default SubHeader;
