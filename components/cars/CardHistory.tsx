import {
  View,
  Text,
  StyleSheet,
  Image,
  GestureResponderEvent,
  TouchableWithoutFeedback,
} from "react-native";

import { getCarLogo } from "@services/homeServices";
import { History } from "@appTypes/history/historyTypes";

type CarHistoryProp = {
  history: History;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

const CardHistory = (props: CarHistoryProp) => {
  const { make, model, pickup_date, price_paid } = props.history;
  const getStatus = () => {
    if (pickup_date.getDate() >= new Date(Date.now()).getDate()) {
      return `waiting on ${pickup_date.toLocaleDateString("en-US")}`;
    }

    return "success";
  };

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.card}>
        <Image style={styles.logo} source={getCarLogo(make)} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{model}</Text>
          <Text style={styles.status}>{getStatus()}</Text>
        </View>
        <Text style={styles.title}>{price_paid} THB</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    gap: 14,
  },
  logo: {
    height: 30,
    width: 30,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  status: {
    color: "#808080",
  },
});

export default CardHistory;
