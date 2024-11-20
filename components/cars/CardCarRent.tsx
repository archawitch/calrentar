import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ImageContain from "@components/images/ImageContain";
import ButtonSmall from "@components/buttons/ButtonSmall";

import { Car } from "@appTypes/cars/carTypes";

import { getCarLogo, getCarImage } from "@services/homeServices";
import { getSaveStatus, updateSaveStatus } from "@services/saveServices";

type CardCarRentProp = {
  carData: Car;
  pickupDate: Date;
  onPress: (event: GestureResponderEvent) => void;
};

const CardCarRent = (props: CardCarRentProp) => {
  const { carData, pickupDate, onPress } = props;

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  // NOTE: check if the car is available on selected pickup date
  const checkAvailable = () => {
    const formattedDate = pickupDate.toISOString().split("T")[0];

    if (carData.rent_date && carData.rent_date[formattedDate]) return false;
    return true;
  };

  // NOTE: logic when clicking favorite button
  const handleFavorite = async () => {
    const { isSuccess, msg } = await updateSaveStatus(carData.id);
    if (!isSuccess) {
      alert(msg);
      return;
    }

    // Toggle favorite if request is successful
    setIsFavorite(!isFavorite);
  };

  // NOTE: get button title
  const getButtonTitle = () => {
    if (isAvailable) {
      const isNow = pickupDate === new Date(Date.now());
      return `Rent${isNow ? " now" : ""} at ${carData.rental_price} THB/day`;
    }

    return `Not available`;
  };

  // Check if the card is marked as favorite or not when first render
  useEffect(() => {
    const unsubscribe = getSaveStatus(carData.id, (status) => {
      setIsFavorite(status); // Update state with the data from Firebase
    });

    // Cleanup: Unsubscribe from the listener when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Check if the car is available on selected pickup date or not
  useEffect(() => {
    const available = checkAvailable();
    setIsAvailable(available);
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={(event) => {
        if (isAvailable) onPress(event);
      }}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image style={styles.logo} source={getCarLogo(carData.make)} />
          <Text style={styles.model}>{carData.model}</Text>
          <TouchableOpacity onPress={handleFavorite}>
            <MaterialIcons
              name="favorite"
              size={32}
              color={isFavorite ? "#FF5A5A" : "#EAEAEB"}
            />
          </TouchableOpacity>
        </View>
        <ImageContain source={getCarImage(carData.id)} />
        <ButtonSmall
          title={getButtonTitle()}
          onPress={onPress}
          disabled={!isAvailable}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 32,
    height: 32,
  },
  model: {
    fontSize: 18,
    flex: 1,
  },
});

export default CardCarRent;
