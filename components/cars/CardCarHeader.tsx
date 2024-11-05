import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";

type CardCarHeaderProp = {
  logo: any;
  model: string;
};

const CardCarHeader = (props: CardCarHeaderProp) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    // TODO: logic when clicking favorite button

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
    <View style={styles.header}>
      <Image style={styles.logo} source={props.logo} />
      <Text style={styles.model}>{props.model}</Text>
      <TouchableNativeFeedback onPress={handleFavorite}>
        <MaterialIcons name="favorite" size={32} color="#FF5A5A" />
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CardCarHeader;
