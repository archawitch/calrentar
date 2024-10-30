import React, { useState } from "react";
import { Text, View, TextInput, Alert, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Reviews from "../components/Reviews";
import Restaurant from "../components/Restaurant";
import StarWithAverage from "../components/StarWithAverage";
import {
  RestaurantData,
  Review,
  DetailsScreenRouteProp,
  DetailsScreenNavigationProp,
} from "../types/types";
import styles from "../styles/styles";

interface DetailsScreenProps {
  route: {
    params: {
      res_data: RestaurantData;
      updateReviews: (
        comment: string,
        star: string,
        restaurant_name: string
      ) => void;
    };
  };
  navigation: any;
}

const DetailsScreen: React.FC<{
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}> = ({ route, navigation }) => {
  const { res_data, updateReviews } = route.params;
  const reviews = res_data.reviews;
  console.log(reviews.length);
  const sum_stars = reviews.reduce(
    (sum, review) => sum + parseInt(review.stars.toString(), 10),
    0
  );
  console.log(sum_stars);
  const average_star = reviews.length > 0 ? sum_stars / reviews.length : 0;
  console.log(average_star);

  const [showReview, setShowReview] = useState<boolean>(true);
  const [star, setStar] = useState<string>("1");
  const [comment, setComment] = useState<string>("");

  const writeReview = () => {
    setShowReview(false);
  };

  const showWriteReview = () => {
    return (
      <View style={{ flex: 1, margin: 10, padding: 10 }}>
        <View style={{ height: 20 }} />
        <Text>Stars</Text>
        <Picker
          selectedValue={star}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => setStar(itemValue)}>
          <Picker.Item label="1 star" value="1" />
          <Picker.Item label="2 star" value="2" />
          <Picker.Item label="3 star" value="3" />
          <Picker.Item label="4 star" value="4" />
          <Picker.Item label="5 star" value="5" />
        </Picker>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={{ height: 100, borderColor: "gray", borderWidth: 1 }}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <View style={styles.group}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              _onPressSubmitReview();
            }}>
            <Text style={styles.buttonText}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const _onPressSubmitReview = () => {
    Alert.alert(star, comment);
    setShowReview(true);
    updateReviews(comment, star, res_data.name);
  };

  const showReviewArea = (
    res_data: RestaurantData,
    average_star: number,
    reviews: Review[]
  ) => {
    return (
      <View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          styles.restaurantContainer,
        ]}>
        <Restaurant
          key={1}
          res_data={res_data}
          navigation={navigation}
          updateReviews={updateReviews}
        />
        {/* show star picture and average star value */}
        <StarWithAverage stars={average_star} />
        {/* show review texts */}
        <TouchableOpacity
          onPress={() => {
            writeReview();
          }}>
          <Text style={styles.signupText}>Write Review</Text>
        </TouchableOpacity>
        <Reviews reviews={reviews} />
      </View>
    );
  };

  return (
    <View
      style={[
        { flex: 1, alignItems: "center", justifyContent: "center" },
        styles.restaurantContainer,
      ]}>
      {showReview
        ? showReviewArea(res_data, average_star, reviews)
        : showWriteReview()}
    </View>
  );
};

export default DetailsScreen;
