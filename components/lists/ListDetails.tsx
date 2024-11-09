import { View, Text, StyleSheet } from "react-native";

interface ListDetailsType {
  title: string;
  details: string;
}

type SubHeaderProp = {
  data: ListDetailsType[];
};

const ListDetails = (props: SubHeaderProp) => {
  return (
    <View style={styles.container}>
      {props.data.map((list) => {
        if (list.details !== "") {
          return (
            <View key={list.title} style={styles.list}>
              <Text style={styles.title}>{list.title}</Text>
              <Text style={styles.details}>{list.details}</Text>
            </View>
          );
        }
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
    flexWrap: "wrap",
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
