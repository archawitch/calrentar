import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import { RestaurantData } from "../types/types";

type RootStackParamList = {
  Home: undefined;
  Details: {
    res_data: RestaurantData;
    updateReviews: (
      new_review: string,
      new_star: string,
      restaurant_name: string
    ) => void;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Restaurants",
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

export default StackNavigator;
