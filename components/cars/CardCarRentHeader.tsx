import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
      <TouchableOpacity onPress={handleFavorite}>
        <MaterialIcons
          name="favorite"
          size={32}
          color={isFavorite ? "#FF5A5A" : "#EAEAEB"}
        />
      </TouchableOpacity>
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
