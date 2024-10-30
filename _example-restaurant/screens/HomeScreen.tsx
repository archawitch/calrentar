import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";

import {
  RestaurantData,
  HomeScreenNavigationProp,
  Review,
} from "../types/types";
import styles from "../styles/styles";
import Restaurant from "../components/Restaurant";
import SignupLogin from "../components/SignUpLogin";

import { getLocation } from "../services/locationService";
import { getRestaurants, saveRestaurant } from "../services/databaseService";

const RADIUS = 20;

const HomeScreen: React.FC<{ navigation: HomeScreenNavigationProp }> = ({
  navigation,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [isShowNearby, setIsShowNearby] = useState<boolean>(true);
  const [restaurantData, setRestaurantData] = useState<RestaurantData[] | null>(
    null
  );
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<RestaurantData[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    _readDB();
    if (Platform.OS === "android" && !Device.isDevice) {
      setErrorMessage(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      _getLocationAsync();
    }
    // test updateReviews
    // updateReviews("Good", "4", "MiiToo");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getLocationAsync = async () => {
    try {
      let { status, location, newRegion } = await getLocation();
      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied");
        return;
      }
      setLocation(location);
    } catch (error) {
      console.error(error);
    }
  };

  const _readDB = async () => {
    const restaurantList = await getRestaurants();
    if (restaurantList != null) {
      setRestaurantData(restaurantList);
    }
  };

  const _computeDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const toRadians = (deg: number): number => {
      return (deg * Math.PI) / 180;
    };

    const R = 6371e3; // metres
    const phi1 = toRadians(lat1);
    const phi2 = toRadians(lat2);
    const delta_phi = toRadians(lat2 - lat1);
    const delta_lambda = toRadians(lon2 - lon1);

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(delta_lambda / 2) *
        Math.sin(delta_lambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;

    return d; // in metres
  };

  const _isWithinRadius = (latlong: string): boolean => {
    /*
    latlong is string of latlong, e.g. "13.6565217,100.6212236"
    This function computes the distance from current location
    (location.coords.latitude, location.coords.longitude)
    to latlong and determine if it's within RADIUS km
    */
    if (typeof latlong !== "string")
      throw new Error("latlong must be a string");
    const data = latlong.split(",");
    const lat = parseFloat(data[0]);
    const long = parseFloat(data[1]);

    if (location) {
      const currentLat = location.coords.latitude;
      const currentLong = location.coords.longitude;
      const distance = _computeDistance(lat, long, currentLat, currentLong);
      return distance <= RADIUS * 1000;
    } else {
      throw new Error("Location is not available yet");
    }
  };

  const _onPressButton = () => {
    if (restaurantData) {
      const restaurantFound: RestaurantData[] = [];
      const patt = new RegExp(searchText, "i"); // build regex pattern

      // Search by restaurant name
      restaurantData.forEach((restaurant) => {
        if (patt.test(restaurant.name)) {
          restaurantFound.push(restaurant);
        }
      });

      // Search by food type
      restaurantData.forEach((restaurant) => {
        if (patt.test(restaurant.type)) {
          restaurantFound.push(restaurant);
        }
      });

      setIsShowNearby(false);
      setSearchResult(restaurantFound);
    }
  };

  const showNearby = () => {
    if (restaurantData) {
      const nearbyRestaurantData = restaurantData.filter((restaurant) => {
        try {
          return _isWithinRadius(restaurant.gps);
        } catch (error) {
          console.error(error);
          return false;
        }
      });

      return (
        <View style={styles.restaurantContainer}>
          <ScrollView style={{ flex: 1 }}>
            {nearbyRestaurantData.map((res_data, i) => (
              <Restaurant
                key={i}
                res_data={res_data}
                navigation={navigation}
                updateReviews={updateReviews}
              />
            ))}
            {/* Workaround for ScrollView cutoff at the bottom */}
            <Image source={require("../images/bottom_filler.png")} />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.restaurantContainer}>
          <Text>Please Wait</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  };

  const showSearchResult = () => {
    if (searchResult.length > 0) {
      return (
        <View style={styles.restaurantContainer}>
          <ScrollView style={{ flex: 1 }}>
            {searchResult.map((res_data, i) => (
              <Restaurant
                key={i}
                res_data={res_data}
                navigation={navigation}
                updateReviews={updateReviews}
              />
            ))}
            {/* Workaround for ScrollView cutoff at the bottom */}
            <Image source={require("../images/bottom_filler.png")} />
          </ScrollView>
        </View>
      );
    } else {
      return <Text>No restaurant found</Text>;
    }
  };

  const showHome = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Restaurant Search</Text>
        <View style={styles.searchArea}>
          <TextInput
            style={{ height: 40, width: 300, fontSize: 20 }}
            placeholder="Search"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableHighlight onPress={_onPressButton} underlayColor="white">
            <View style={styles.searchButton}>
              <Image
                style={{ height: 30, width: 30 }}
                source={require("../images/search_icon.png")}
              />
            </View>
          </TouchableHighlight>
        </View>
        <View>{isShowNearby ? showNearby() : showSearchResult()}</View>
      </View>
    );
  };

  const loginSuccess = () => {
    setIsLogin(true);
  };

  const showLoginSignup = () => {
    return <SignupLogin loginCB={loginSuccess} />;
  };

  const updateReviews = (
    new_review: string,
    new_star: string,
    restuarant_name: string
  ) => {
    // console.log("updateReviews");
    const restaurantIndex = restaurantData?.findIndex(
      (res) => res.name === restuarant_name
    );
    const restaurant =
      restaurantIndex !== undefined && restaurantIndex >= 0
        ? restaurantData?.[restaurantIndex]
        : undefined;
    // console.log("found restaurant",restaurantIndex);
    if (restaurant) {
      const newReview: Review = {
        comment: new_review,
        stars: parseInt(new_star, 10),
      };
      const updatedReviews = [...restaurant.reviews, newReview];
      const newResData = { ...restaurant, reviews: updatedReviews };
      // console.log("newResData",newResData);
      saveRestaurant(restaurantIndex, newResData);

      // Update the restaurantData state with the new review
      if (restaurantData) {
        const updatedRestaurantData = [...restaurantData];
        if (restaurantIndex !== undefined && restaurantIndex >= 0) {
          updatedRestaurantData[restaurantIndex] = newResData;
        }
        setRestaurantData(updatedRestaurantData);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLogin ? showHome() : showLoginSignup()}
    </View>
  );
};

export default HomeScreen;
