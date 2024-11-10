import { ScrollView, View, Text, StyleSheet, Image } from "react-native";

import { HistoryScreenProps } from "@appTypes/navigation/navigationTypes";
import Header from "@components/headers/Header";
import { useCallback, useEffect, useState } from "react";

import { History } from "@appTypes/history/historyTypes";
import CardHistory from "@components/cars/CardHistory";

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const [history, setHistory] = useState<History[]>([]);

  // TODO: fetch history of the user
  const fetchHistory = useCallback(async () => {
    // let detail = await getHistory();
    // if (detail) {
    //   setCarDetail((prev): CarDetail => {
    //     return {
    //       ...prev,
    //       horse_power: detail.horse_power,
    //       seats: detail.seats,
    //       transmission: detail.transmission,
    //       year_produced: detail.year_produced,
    //     };
    //   });
    // }
  }, []);

  useEffect(() => {
    fetchHistory();

    // Mock up
    setHistory(() => {
      let mockup: History[] = [];
      for (let index = 0; index < 5; index++) {
        mockup.push(
          {
            car_id: 1,
            make: "Honda",
            model: "Civic",
            year_produced: 2023,
            color: "Black",
            pickup_location: "Bangkok",
            pickup_date: new Date(Date.now()),
            return_date: new Date(Date.now()),
            pickup_type: "Self-pickup",
            price_paid: 750,
          },
          {
            car_id: 2,
            make: "Honda",
            model: "City",
            year_produced: 2024,
            color: "White",
            pickup_location: "Bangkok",
            pickup_date: new Date(Date.now()),
            return_date: new Date(
              new Date().setDate(new Date(Date.now()).getDate() + 1)
            ),
            pickup_type: "Delivery service",
            price_paid: 10750,
          }
        );
      }

      return mockup;
    });
  }, []);

  const navigateToRentInfo = (item: History) => {
    navigation.navigate("HistoryDetails", {
      history: item,
    });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Header title="History" />
        {history.map((item, index) => {
          return (
            <CardHistory
              key={index}
              history={item}
              onPress={() => navigateToRentInfo(item)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 76,
    paddingHorizontal: 20,
    gap: 16,
  },
});

export default HistoryScreen;
