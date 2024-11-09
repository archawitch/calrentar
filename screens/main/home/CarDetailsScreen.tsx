import { ScrollView, View, StyleSheet } from "react-native";

import { CarDetailsScreenProps } from "@appTypes/navigation/navigationTypes";
import Header from "@components/headers/Header";
import SubHeader from "@components/headers/SubHeader";
import CardCarModel from "@components/cars/CardCarModel";
import CarProperty from "@components/cars/CarProperty";
import ToggleButton from "@components/buttons/ToggleButton";
import ButtonLarge from "@components/buttons/ButtonLarge";
import { useCallback, useEffect, useState } from "react";

import { CarDetail } from "@appTypes/cars/carTypes";

import { getCarDetail } from "@services/carDetailServices";

const CarDetailsScreen: React.FC<CarDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { carData, pickupDate } = route.params;
  const [carDetail, setCarDetail] = useState<CarDetail>({
    id: 0,
    horse_power: 0,
    seats: 0,
    transmission: "",
    year_produced: 0,
  });

  const fetchCarDetail = useCallback(async (id: number) => {
    let detail = await getCarDetail(id);
    if (detail) {
      setCarDetail(detail);
    }
  }, []);

  useEffect(() => {
    fetchCarDetail(carData.id);
  }, []);

  const navigateToRentInfo = () => {
    navigation.navigate("RentForm", {
      carData: carData,
      pickupDate: pickupDate,
    });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Header title="Car details" goBack={() => navigation.goBack()} />
        <CardCarModel carData={carData} />
        <View style={styles.propertiesContainer}>
          <CarProperty iconName="event-seat" title={`${carDetail.seats} seats`} />
          <CarProperty
            iconName="battery-charging-full"
            title={`${carDetail.horse_power} hp`}
          />
          <CarProperty iconName="settings" title={carDetail.transmission} />
          <CarProperty
            iconName="calendar-month"
            title={String(carDetail.year_produced)}
          />
        </View>
        <SubHeader title="Color" />
        <View style={styles.buttonsContainer}>
          <ToggleButton title={carData.color} isActive />
        </View>
        <SubHeader title="Available Location" />
        <View style={[styles.buttonsContainer, { paddingBottom: 20 }]}>
          {carData.available_location.map((location) => {
            return (
              <ToggleButton
                key={location}
                title={location}
                isActive={false}
                disabled
              />
            );
          })}
        </View>
        <ButtonLarge
          title={`Rent now at ${carData.rental_price} THB/day`}
          onPress={navigateToRentInfo}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 40,
    paddingHorizontal: 28,
    backgroundColor: "white",
    gap: 16,
  },
  propertiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});

export default CarDetailsScreen;
