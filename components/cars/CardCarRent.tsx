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

import { CarData } from "@appTypes/cars/carTypes";
import ImageContain from "@components/images/ImageContain";
import ButtonSmall from "@components/buttons/ButtonSmall";

type CardCarRentProp = {
  carData: CarData;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const CardCarRent = (props: CardCarRentProp) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // TODO: retrieve logo image by car make here ...
  const getCarLogo = (make: string) => {
    // Mock up
    return require("@assets/images/illustrations/login-illustration.png");
  };

  // TODO: retrieve car image by id here ...
  const getCarImage = (id: number) => {
    // TODO:  Get car image (side)

    // Mock up
    return require("@assets/images/illustrations/signup-illustration.png");
  };

  const handleFavorite = () => {
    // TODO: logic when clicking favorite button
    // const carId = props.id

    // const error = updateFavorite(carId)
    const error = false;
    if (error) {
      console.warn(error);
      return;
    }

    // Toggle favorite if request is successful
    setIsFavorite(!isFavorite);
  };

  // Check if the card is marked as favorite or not when first render
  useEffect(() => {
    handleFavorite();
  }, []);

  return (
    <View style={styles.card}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={getCarLogo(props.carData.make)}
            />
            <Text style={styles.model}>{props.carData.model}</Text>
            <TouchableOpacity onPress={handleFavorite}>
              <MaterialIcons
                name="favorite"
                size={32}
                color={isFavorite ? "#FF5A5A" : "#EAEAEB"}
              />
            </TouchableOpacity>
          </View>
          <ImageContain source={getCarImage(props.carData.id)} />
          <ButtonSmall
            title={`Rent now at ${props.carData.rental_price} THB/day`}
            onPress={props.onPress}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
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
