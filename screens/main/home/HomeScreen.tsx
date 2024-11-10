import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { HomeScreenProps } from "@appTypes/navigation/navigationTypes";
import { Car, CarFilterType } from "@appTypes/cars/carTypes";

import Input from "@components/inputs/Input";
import SubHeader from "@components/headers/SubHeader";
import ToggleButton from "@components/buttons/ToggleButton";
import Header from "@components/headers/Header";
import ButtonSmall from "@components/buttons/ButtonSmall";
import CardCarRent from "@components/cars/CardCarRent";

import { getCars, getLocations, getTopFive } from "@services/homeServices";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [allLocations, setAllLocations] = useState<string[]>([]);

  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const [filter, setFilter] = useState<CarFilterType>({
    searchInput: "",
    pickupDate: new Date(Date.now()),
    priceRange: {
      minPrice: 0,
      maxPrice: 50000,
    },
    location: [],
    makes: [],
    models: [],
    colors: [],
  });
  const [currentPickupDate, setCurrentPickupDate] = useState<Date>(
    new Date(Date.now())
  );
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // NOTE: Handle searching based on filters
  const handleSearch = () => {
    const {
      searchInput,
      pickupDate,
      priceRange: { minPrice, maxPrice },
      location,
      makes,
      models,
      colors,
    } = filter;

    if (!pickupDate) {
      alert("No pickup date");
      return;
    }

    const formattedDate = pickupDate.toISOString().split("T")[0];
    const searchPattern = new RegExp(filter.searchInput, "i");

    const availableCars = allCars.filter((car) => {
      if (car.rent_date[formattedDate]) return false;

      if (
        searchInput &&
        !searchPattern.test(car.make) &&
        !searchPattern.test(car.model)
      )
        return false;

      if (car.rental_price < minPrice || car.rental_price > maxPrice)
        return false;

      if (
        location.length > 0 &&
        !location.some((loc) => car.available_location.includes(loc))
      )
        return false;

      if (makes.length > 0 && !makes.includes(car.make)) return false;

      if (models.length > 0 && !models.includes(car.model)) return false;

      if (colors.length > 0 && !colors.includes(car.color)) return false;

      return true;
    });

    // Parse search results
    setSearchResults(availableCars);
    setCurrentPickupDate(pickupDate);
  };

  // NOTE: Handle to navigate to car information
  const navigateToCarInfo = (car: Car, pickupDate: Date) => {
    navigation.navigate("CarDetails", {
      carData: car,
      pickupDate: pickupDate,
    });
  };

  // NOTE: Get car makes based on car location
  const getMakes = () => {
    // Filter car makes available in selected location
    const selectedLocation = filter.location;
    if (!selectedLocation) return [];

    const makesSet = new Set<string>();

    allCars.forEach((car) => {
      if (
        selectedLocation.some((location) =>
          car.available_location.includes(location)
        )
      ) {
        makesSet.add(car.make);
      }
    });

    return Array.from(makesSet);
  };

  // NOTE: Get car models based on car makes
  const getModels = () => {
    // Filter car models available in selected makes
    const selectedMakes = filter.makes;
    if (!selectedMakes) return [];

    const modelsSet = new Set<string>();

    allCars.forEach((car) => {
      if (selectedMakes.some((make) => car.make.includes(make))) {
        modelsSet.add(car.model);
      }
    });

    return Array.from(modelsSet);
  };

  // NOTE: Get car colors based on car models
  const getColors = () => {
    // Filter car colors available in selected models
    const selectedModels = filter.models;
    if (!selectedModels) return [];

    const colorsSet = new Set<string>();

    allCars.forEach((car) => {
      if (selectedModels.some((model) => car.model.includes(model))) {
        colorsSet.add(car.color);
      }
    });

    return Array.from(colorsSet);
  };

  const toggleFilter = (
    key: "location" | "makes" | "models" | "colors",
    value: string
  ) => {
    setFilter((prev) => {
      const updatedList = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return {
        ...prev,
        [key]: updatedList,
      };
    });
  };

  const fetchCars = async () => {
    let cars = await getCars();
    if (cars) {
      setAllCars(cars);
    }
  };

  const fetchTopFive = async () => {
    let topFive = await getTopFive();
    if (topFive) {
      setSearchResults(topFive);
    }
  };

  const fetchLocation = async () => {
    let locations = await getLocations();
    if (locations) {
      setAllLocations(locations);
      setFilter((prev) => ({
        ...prev,
        location: locations,
      }));
    }
  };

  // NOTE: retrieve popular cars list here ...
  useEffect(() => {
    fetchCars();
    fetchLocation();
    fetchTopFive();
  }, []);

  // NOTE: handle location selection ...
  useEffect(() => {
    const newMakes = getMakes();
    setMakes(newMakes);
    setFilter((prev) => ({
      ...prev,
      makes: newMakes.filter((make) => prev.makes.includes(make)),
    }));
  }, [filter.location]);

  // NOTE: handle makes selection
  useEffect(() => {
    const newModels = getModels();
    setModels(newModels);
    setFilter((prev) => ({
      ...prev,
      models: newModels.filter((model) => prev.models.includes(model)),
    }));
  }, [filter.makes]);

  // NOTE: handle models selection
  useEffect(() => {
    const newColors = getColors();
    setColors(newColors);
    setFilter((prev) => ({
      ...prev,
      colors: newColors.filter((color) => prev.colors.includes(color)),
    }));
  }, [filter.models]);

  // NOTE: handle filter changed
  useEffect(() => {
    handleSearch();
  }, [filter]);

  // Render Filter screen
  if (showFilter) {
    return (
      <ScrollView style={styles.scrollViewWhite}>
        <View style={[styles.container, { paddingBottom: 60 }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Header title="Filter your car" />
            <TouchableOpacity onPress={() => setShowFilter(false)}>
              <MaterialIcons name="close" size={32} color="black" />
            </TouchableOpacity>
          </View>
          <SubHeader title="Price range (THB/day)" />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Input
              value={String(filter.priceRange.minPrice)}
              inputMode="numeric"
              iconName="attach-money"
              onChangeText={(newInput: string) => {
                if (newInput.trim() === "") newInput = "0";
                setFilter((prev) => ({
                  ...prev,
                  priceRange: {
                    minPrice: parseInt(newInput),
                    maxPrice: prev.priceRange.maxPrice,
                  },
                }));
              }}
            />
            <Input
              value={String(filter.priceRange.maxPrice)}
              inputMode="numeric"
              iconName="attach-money"
              onChangeText={(newInput: string) => {
                if (newInput.trim() === "") newInput = "0";
                setFilter((prev) => ({
                  ...prev,
                  priceRange: {
                    minPrice: prev.priceRange.minPrice,
                    maxPrice: parseInt(newInput),
                  },
                }));
              }}
            />
          </View>
          <SubHeader title="Location" />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
            }}>
            {allLocations.map((location) => (
              <ToggleButton
                key={location}
                title={location}
                isActive={filter.location.includes(location)}
                onPress={() => {
                  toggleFilter("location", location);
                }}
              />
            ))}
          </View>
          {makes.length > 0 && <SubHeader title="Brands" />}
          {makes.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
              }}>
              {makes.map((make) => (
                <ToggleButton
                  key={make}
                  title={make}
                  isActive={filter.makes.includes(make)}
                  onPress={() => {
                    toggleFilter("makes", make);
                  }}
                />
              ))}
            </View>
          )}
          {models.length > 0 && <SubHeader title="Models" />}
          {models.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
              }}>
              {models.map((model) => (
                <ToggleButton
                  key={model}
                  title={model}
                  isActive={filter.models.includes(model)}
                  onPress={() => {
                    toggleFilter("models", model);
                  }}
                />
              ))}
            </View>
          )}
          {colors.length > 0 && <SubHeader title="Colors" />}
          {colors.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
              }}>
              {colors.map((color) => (
                <ToggleButton
                  key={color}
                  title={color}
                  isActive={filter.colors.includes(color)}
                  onPress={() => {
                    toggleFilter("colors", color);
                  }}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }

  // Render Home screen
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Header title="Home" />
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <MaterialIcons name="search" size={18} color="#656F77" />
            <TextInput
              style={styles.inputText}
              placeholder="Find your car"
              value={filter.searchInput}
              onChangeText={(newInput: string) => {
                setFilter((prev) => ({
                  ...prev,
                  searchInput: newInput,
                }));
              }}
            />
            <TouchableOpacity onPress={() => setShowFilter(true)}>
              <MaterialIcons name="chevron-right" size={22} color="#A1A1A6" />
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback
            onPress={() => setShowDatePicker(!showDatePicker)}>
            <View style={styles.input}>
              <MaterialIcons name="calendar-month" size={18} color="#656F77" />
              <Text
                style={[
                  styles.inputText,
                  { color: filter.pickupDate ? "black" : "#bbbbbb" },
                ]}>
                {filter.pickupDate
                  ? filter.pickupDate.toLocaleDateString("en-US")
                  : "Pick-up date"}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {showDatePicker && (
            <View style={styles.datePicker}>
              <DateTimePicker
                testID="dateTimePicker"
                value={filter.pickupDate ?? new Date(Date.now())}
                mode="date"
                display="inline"
                onChange={(event, selectedDate) => {
                  setFilter((prev) => ({
                    ...prev,
                    pickupDate: selectedDate ?? new Date(Date.now()),
                  }));
                  setShowDatePicker(false);
                }}
              />
            </View>
          )}
        </View>
        <ButtonSmall title="Search" onPress={handleSearch} />
        <SubHeader title="Popular Cars" />
        {searchResults.map((carData) => {
          return (
            <CardCarRent
              key={carData.id}
              carData={carData}
              onPress={() => navigateToCarInfo(carData, currentPickupDate)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#F9F9F9",
  },
  scrollViewWhite: {
    backgroundColor: "white",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 16,
  },
  inputContainer: {
    gap: 10,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: 8,
    padding: 10,
    gap: 10,
  },
  inputText: {
    fontSize: 16,
    flex: 1,
  },
  datePicker: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: 8,
  },
});

export default HomeScreen;
