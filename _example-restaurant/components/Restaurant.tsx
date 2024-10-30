import React from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import {
  RestaurantData,
  HomeScreenNavigationProp,
  DetailsScreenNavigationProp,
} from "../types/types";
import styles from "../styles/styles";

interface RestaurantProps {
  res_data: RestaurantData;
  navigation: HomeScreenNavigationProp | DetailsScreenNavigationProp;
  updateReviews: (
    new_review: string,
    new_star: string,
    restaurant_name: string
  ) => void;
}

const Restaurant: React.FC<RestaurantProps> = ({
  res_data,
  navigation,
  updateReviews,
}) => {
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("Details", {
          res_data: res_data,
          updateReviews: updateReviews,
        });
      }}
      underlayColor="white">
      <View style={styles.restaurant}>
        <Text style={{ fontSize: 20 }}>{res_data.name}</Text>
        <Text style={{ fontSize: 12 }}>
          วันทำการ {res_data.open_day} เวลาทำการ {res_data.open_time}
        </Text>
        <Text style={{ fontSize: 12 }}>โทรศัพท์ {res_data.phone}</Text>
        <View style={{ flexDirection: "row" }}>
          {res_data.images.slice(0, 3).map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={styles.food_img}
            />
          ))}
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default Restaurant;
