import { ScrollView, View, Text, StyleSheet } from "react-native";

import {
  HistoryDetailsScreenProps,
  RentConfirmationScreenProps,
} from "@appTypes/navigation/navigationTypes";
import Header from "@components/headers/Header";
import SubHeader from "@components/headers/SubHeader";
import ButtonLarge from "@components/buttons/ButtonLarge";
import ImageContain from "@components/images/ImageContain";
import ListDetails from "@components/lists/ListDetails";

import { getCarImage } from "@services/homeServices";
// import { storeRentInfo } from "@services/rentServices";

const HistoryDetailsScreen: React.FC<HistoryDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    history: {
      car_id,
      make,
      model,
      year_produced,
      color,
      pickup_location,
      pickup_date,
      pickup_type,
      price_paid,
      return_date,
    },
  } = route.params;

  const getRentalPrice = () => {
    let pickupPrice = pickup_type === "Delivery service" ? 300 : 0;
    return price_paid - pickupPrice;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Header title="Rent details" goBack={() => navigation.goBack()} />
        <ImageContain source={getCarImage(car_id)} />
        <SubHeader title="Car information" />
        <ListDetails
          data={[
            { title: "Brand", details: make },
            { title: "Model", details: model },
            { title: "Year", details: String(year_produced) },
            { title: "Color", details: color },
          ]}
        />
        <SubHeader title="Pick-up information" />
        <ListDetails
          data={[
            {
              title: "Pick-up Date",
              details: pickup_date.toLocaleDateString("en-US"),
            },
            {
              title: "Return Date",
              details: return_date.toLocaleDateString("en-US"),
            },
            {
              title: "Type",
              details: pickup_type,
            },
            {
              title: "Location",
              details: pickup_location,
            },
          ]}
        />
        <SubHeader title="Payment information" />
        <ListDetails
          data={[
            {
              title: "Rent Rate per Day",
              details: `${getRentalPrice()} THB/day`,
            },
            {
              title: "No. of Days",
              details: "1",
            },
            {
              title: "Delivery Fee",
              details: pickup_type === "Delivery service" ? "300 THB" : "",
            },
          ]}
        />
        <View style={styles.hr} />
        <View style={{ marginBottom: 80 }}>
          <ListDetails
            data={[
              {
                title: "Price Paid",
                details: `${price_paid} THB`,
              },
            ]}
          />
        </View>
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
    paddingHorizontal: 20,
    backgroundColor: "white",
    gap: 16,
  },
  hr: {
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default HistoryDetailsScreen;
