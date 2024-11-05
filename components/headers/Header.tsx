import { Text, StyleSheet } from "react-native";

type HeaderProp = {
  title: string;
};

const Header = (props: HeaderProp) => {
  return <Text style={styles.text}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
    flex: 1,
  },
});

export default Header;
