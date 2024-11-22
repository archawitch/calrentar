import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import { RentConfirmationScreenProps } from "@appTypes/navigation/navigationTypes";
import { History } from "@appTypes/history/historyTypes";

import Header from "@components/headers/Header";
import SubHeader from "@components/headers/SubHeader";
import ButtonLarge from "@components/buttons/ButtonLarge";
import ImageContain from "@components/images/ImageContain";
import ListDetails from "@components/lists/ListDetails";
import Alert from "@components/alert/Alert";

import { getCarImage } from "@services/homeServices";
import { rentCar } from "@services/rentServices";
import { formatDate } from "@services/utilsServices";

const RentConfirmationScreen: React.FC<RentConfirmationScreenProps> = ({
  navigation,
  route,
}) => {
  const { carData, rentForm } = route.params;
  const pricePaid =
    carData.rental_price +
    (rentForm.pickupType === "Delivery service" ? 300 : 0);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  // NOTE: handle rent confirmation here ...
  const handleConfirmRent = async () => {
    // NOTE: add rent information to database
    if (!isConfirm) {
      const rentInfo: History = {
        car_id: carData.id,
        make: carData.make,
        model: carData.model,
        year_produced: carData.year_produced,
        color: carData.color,
        price_paid: pricePaid,
        pickup_date: rentForm.pickupDate,
        return_date: rentForm.returnDate,
        pickup_type: rentForm.pickupType,
        pickup_location: rentForm.pickupLocation,
        renter_name: rentForm.name,
        driver_license_no: rentForm.driverLicense,
      };
      const { isSuccess, msg } = await rentCar(rentInfo);

      if (!isSuccess) {
        alert(msg);
        return;
      }

      // Open alert screen
      setIsConfirm(isSuccess);
    }
  };

  // After showing alert screen, navigate to history screen
  useEffect(() => {
    if (isConfirm) {
      setTimeout(() => {
        navigation.navigate("Main", {
          screen: "HistoryTab",
          params: {
            screen: "History",
          },
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
              details: formatDate(rentForm.pickupDate),
            },
            {
              title: "Return Date",
              details: formatDate(rentForm.returnDate),
            },
            { title: "Type", details: rentForm.pickupType },
            {
              title: "Location",
              details: rentForm.pickupLocation,
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
        <View style={styles.hr} />
        <View style={{ paddingBottom: 18 }}>
          <ListDetails
            data={[
              {
                title: "Total Payment",
                details: `${pricePaid} THB`,
              },
            ]}
          />
        </View>
        <ButtonLarge
          title="Confirm"
          disabled={isConfirm}
          onPress={() => {
            setIsConfirm(true);
            handleConfirmRent();
          }}
        />
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
    paddingBottom: 32,
    paddingHorizontal: 20,
    backgroundColor: "white",
    gap: 16,
  },
  hr: {
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default RentConfirmationScreen;
