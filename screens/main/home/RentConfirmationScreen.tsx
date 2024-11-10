import { ScrollView, View, Text, StyleSheet } from "react-native";

import { RentConfirmationScreenProps } from "@appTypes/navigation/navigationTypes";
import Header from "@components/headers/Header";
import SubHeader from "@components/headers/SubHeader";
import ButtonLarge from "@components/buttons/ButtonLarge";
import ImageContain from "@components/images/ImageContain";
import ListDetails from "@components/lists/ListDetails";

import { getCarDetail } from "@services/carDetailServices";
import { getCarImage } from "@services/homeServices";
import { useCallback, useEffect, useState } from "react";
import { CarDetail } from "@appTypes/cars/carTypes";
import Alert from "@components/alert/Alert";
import { storeRentInfo } from "@services/rentServices";

const RentConfirmationScreen: React.FC<RentConfirmationScreenProps> = ({
  navigation,
  route,
}) => {
  const { carData, rentForm } = route.params;
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  // TODO: handle rent confirmation here ...
  const handleConfirmRent = () => {
    // TODO: add rent information to database
    // const { isSuccess, msg } = storeRentInfo(carData.id, rentForm);

    // Open alert screen
    setIsConfirm(true);

    // navigate to history screen
    // navigation.navigate("RentForm", {
    //   carData: carData,
    //   pickupDate: pickupDate,
    // });
  };

  // After showing alert screen, navigate to history screen
  useEffect(() => {
    if (isConfirm) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          // TODO: Change to history screen
          routes: [
            {
              name: "Main",
              params: { screen: "HomeTab", params: { screen: "Home" } },
            },
          ],
        });
      }, 3000);
    }
  }, [isConfirm]);

  return !isConfirm ? (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Header title="Confirm rent" goBack={() => navigation.goBack()} />
        <ImageContain source={getCarImage(carData.id)} />
        <SubHeader title="Car information" />
        <ListDetails
          data={[
            { title: "Brand", details: carData.make },
            { title: "Model", details: carData.model },
            { title: "Year", details: String(carData.year_produced) },
            { title: "Color", details: carData.color },
          ]}
        />
        <SubHeader title="Pick-up information" />
        <ListDetails
          data={[
            {
              title: "Pick-up Date",
              details: rentForm.pickupDate.toLocaleDateString("en-US"),
            },
            {
              title: "Return Date",
              details: rentForm.returnDate.toLocaleDateString("en-US"),
            },
            { title: "Type", details: rentForm.pickupType },
            {
              title: "Location",
              details: `${rentForm.pickupLocation} ${
                rentForm.pickupType === "Self-pickup" ? "center" : ""
              }`,
            },
          ]}
        />
        <SubHeader title="Your information" />
        <ListDetails
          data={[
            {
              title: "Name",
              details: rentForm.name,
            },
            {
              title: "Driver License No.",
              details: rentForm.driverLicense,
            },
          ]}
        />
        <SubHeader title="Payment information" />
        <ListDetails
          data={[
            {
              title: "Rent Rate per Day",
              details: `${carData.rental_price} THB/day`,
            },
            {
              title: "No. of Days",
              details: "1",
            },
            {
              title: "Delivery Fee",
              details:
                rentForm.pickupType === "Delivery service" ? "300 THB" : "",
            },
          ]}
        />
        <View
          style={{
            borderBottomColor: "#CCCCCC",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={{ paddingBottom: 18 }}>
          <ListDetails
            data={[
              {
                title: "Total Payment",
                details: `${
                  carData.rental_price +
                  (rentForm.pickupType === "Delivery service" ? 300 : 0)
                } THB`,
              },
            ]}
          />
        </View>
        <ButtonLarge title="Confirm" onPress={handleConfirmRent} />
      </View>
    </ScrollView>
  ) : (
    <Alert
      type="notify"
      isSuccess={isConfirm}
      title="Rent successfully"
      details="Enjoy your ride!"
    />
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

export default RentConfirmationScreen;
