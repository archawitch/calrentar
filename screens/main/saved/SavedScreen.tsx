import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

import { SavedScreenProps } from "@appTypes/navigation/navigationTypes";
import { Car } from "@appTypes/cars/carTypes";
import Header from "@components/headers/Header";
import CardCarRent from "@components/cars/CardCarRent";

import { getTopFive } from "@services/homeServices";

const SavedScreen: React.FC<SavedScreenProps> = ({ navigation }) => {
  const [savedCars, setSavedCars] = useState<Car[]>([]);

  // TODO: fetch saved cars of the user
  const fetchSavedCars = async () => {
    // Mock up
    const cars = await getTopFive();
    if (cars) {
      setSavedCars(cars);
    }
  };

  useEffect(() => {
    fetchSavedCars();
  }, []);

  // Navigate to Car detail screen
  const navigateToCarInfo = (car: Car, pickupDate: Date) => {
    navigation.navigate("Main", {
      screen: "HomeTab",
      params: {
        screen: "CarDetails",
        params: {
          carData: car,
          pickupDate: pickupDate,
        },
      },
    });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Header title="Saved" />
        {savedCars.map((carData) => {
          {
            /*** TODO: Don't forget to implement saved function in CardCarRent ***/
          }
          return (
            <CardCarRent
              key={carData.id}
              carData={carData}
              pickupDate={new Date(Date.now())}
              onPress={() => navigateToCarInfo(carData, new Date(Date.now()))}
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

export default SavedScreen;