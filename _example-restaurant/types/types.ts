import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Details: {
    res_data: RestaurantData;
    updateReviews: (
      new_review: string,
      new_star: string,
      restuarant_name: string
    ) => void;
  };
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;
export type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Details"
>;

export interface Review {
  comment: string;
  stars: number;
}

export interface RestaurantData {
  name: string;
  open_day: string;
  open_time: string;
  phone: string;
  images: string[];
  type: string;
  gps: string;
  reviews: Review[];
}
