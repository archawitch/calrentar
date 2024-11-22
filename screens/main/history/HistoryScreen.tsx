import { useCallback, useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { HistoryScreenProps } from "@appTypes/navigation/navigationTypes";
import { HistoryItem } from "@appTypes/history/historyTypes";

import Header from "@components/headers/Header";
import CardHistory from "@components/cars/CardHistory";

import { getHistoryList } from "@services/historyServices";

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const isScreenFocused = useIsFocused();

  const [history, setHistory] = useState<HistoryItem[]>([]);

  // NOTE: fetch history of the user
  const fetchHistory = useCallback(async () => {
    let historyList = await getHistoryList();
    if (historyList) {
      setHistory(historyList);
    }
  }, []);

  useEffect(() => {
    if (isScreenFocused) {
      fetchHistory();
    }
  }, [isScreenFocused]);

  const navigateToRentInfo = (item: HistoryItem) => {
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    gap: 16,
  },
});

export default HistoryScreen;
