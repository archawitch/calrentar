import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

import { HistoryDetailsScreenProps } from "@appTypes/navigation/navigationTypes";
import { History } from "@appTypes/history/historyTypes";

import Header from "@components/headers/Header";
import SubHeader from "@components/headers/SubHeader";
import ImageContain from "@components/images/ImageContain";
import ListDetails from "@components/lists/ListDetails";

import { getCarImage } from "@services/homeServices";
import { getHistoryDetail } from "@services/historyServices";
import { formatDate } from "@services/utilsServices";

const HistoryDetailsScreen: React.FC<HistoryDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    history: { id, car_id, make, model, pickup_date, price_paid, return_date },
  } = route.params;

  const [historyDetail, setHistoryDetail] = useState<History>({
    car_id: car_id,
    make: make,
    model: model,
    year_produced: 0,
    color: "",
    price_paid: price_paid,
    pickup_date: pickup_date,
    return_date: return_date,
    pickup_type: "Self-pickup",
    pickup_location: "",
    renter_name: "",
    driver_license_no: "",
  });

  const fetchHistoryDetail = async () => {
    let historyDetail = await getHistoryDetail(id);
    if (historyDetail) {
      setHistoryDetail(historyDetail);
    }
  };

  useEffect(() => {
    fetchHistoryDetail();
  }, []);

  const getRentalPrice = () => {
    let pickupPrice =
      historyDetail.pickup_type === "Delivery service" ? 300 : 0;
    return price_paid - pickupPrice;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Header title="Rent details" goBack={() => navigation.goBack()} />
        <ImageContain source={getCarImage(historyDetail.car_id)} />
        <SubHeader title="Car information" />
        <ListDetails
          data={[
            { title: "Brand", details: historyDetail.make },
            { title: "Model", details: historyDetail.model },
            { title: "Year", details: String(historyDetail.year_produced) },
            { title: "Color", details: historyDetail.color },
          ]}
        />
        <SubHeader title="Pick-up information" />
        <ListDetails
          data={[
            {
              title: "Pick-up Date",
              details: formatDate(historyDetail.pickup_date),
            },
            {
              title: "Return Date",
              details: formatDate(historyDetail.return_date),
            },
            {
              title: "Type",
              details: historyDetail.pickup_type,
            },
            {
              title: "Location",
              details: historyDetail.pickup_location,
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
              details:
                historyDetail.pickup_type === "Delivery service"
                  ? "300 THB"
                  : "",
            },
          ]}
        />
        <View style={styles.hr} />
        <View style={{ marginBottom: 80 }}>
          <ListDetails
            data={[
              {
                title: "Price Paid",
                details: `${historyDetail.price_paid} THB`,
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
