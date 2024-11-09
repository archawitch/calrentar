import { View, Text, StyleSheet } from "react-native";
import { ListDetailsType } from "@appTypes/screens/screenTypes";

type SubHeaderProp = {
  data: ListDetailsType[];
};

const ListDetails = (props: SubHeaderProp) => {
  return (
    <View style={styles.container}>
      {props.data.map((list) => {
        return (
          <View style={styles.list}>
            <Text style={styles.title}>{list.title}</Text>
            <Text style={styles.details}>{list.details}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    color: "#808080",
  },
  details: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});

export default ListDetails;
