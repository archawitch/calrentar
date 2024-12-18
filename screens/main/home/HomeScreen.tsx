import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { HomeScreenProps } from "@appTypes/navigation/navigationTypes";
import { Car } from "@appTypes/cars/carTypes";
import { CarFilterType } from "@appTypes/screens/screenTypes";

import Input from "@components/inputs/Input";
import SubHeader from "@components/headers/SubHeader";
import ToggleButton from "@components/buttons/ToggleButton";
import Header from "@components/headers/Header";
import ButtonSmall from "@components/buttons/ButtonSmall";
import CardCarRent from "@components/cars/CardCarRent";
import DatePicker from "@components/datepicker/DatePicker";

import { getCars, getLocations, getTopFive } from "@services/homeServices";
import { formatDate } from "@services/utilsServices";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const isScreenFocused = useIsFocused();

  const [allCars, setAllCars] = useState<Car[]>([]);
  const [allLocations, setAllLocations] = useState<string[]>([]);

  const [searchResults, setSearchResults] = useState<{
    availableCars: Car[];
    unavailableCars: Car[];
  }>({
    availableCars: [],
    unavailableCars: [],
  });
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const [filter, setFilter] = useState<CarFilterType>({
    searchInput: "",
    pickupDate: new Date(Date.now()),
    priceRange: {
      minPrice: 0,
      maxPrice: 100000,
    },
    location: [
      "Bangkok",
      "Phuket",
      "Chiang Mai",
      "Pattaya",
      "Nakhon Ratchasima",
    ],
    makes: [],
    models: [],
    colors: [],
  });
  const [currentPickupDate, setCurrentPickupDate] = useState<Date>(
    new Date(Date.now())
  );
  const [minDate, setMinDate] = useState<Date>(new Date(Date.now()));
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [carListTitle, setCarListTitle] = useState<string>("Popular Cars");

  const isInit = useRef(true);
  const isFirstRender = useRef(true);

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

    const formattedDate = formatDate(pickupDate);
    const searchPattern = new RegExp(filter.searchInput.replace(/[^\w\s]/g, ''), "i");

    const unavailableCars: Car[] = [];
    const availableCars = allCars.filter((car) => {
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

      if (car.rent_date && car.rent_date[formattedDate]) {
        unavailableCars.push(car);
        return false;
      }

      return true;
    });

    // Parse search results
    setSearchResults({
      availableCars: availableCars,
      unavailableCars: unavailableCars,
    });
    setCurrentPickupDate(pickupDate);

    // Set car list title
    setCarListTitle("Available Cars");
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
      setSearchResults((prev) => ({
        ...prev,
        availableCars: topFive,
      }));
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

  // NOTE: get minimum date for date picker
  const getMinDate = () => {
    const currentDate = new Date(Date.now());
    const minDate = new Date("2024-12-01");
    return currentDate > minDate ? currentDate : minDate;
  };

  // NOTE: initialize pickup date
  const initDate = () => {
    const minDate = getMinDate();
    setMinDate(minDate);
    setCurrentPickupDate(minDate);
    setFilter((prev) => ({
      ...prev,
      pickupDate: minDate,
    }));
  };

  // NOTE: reset all state
  const resetState = () => {
    setAllCars([]);
    if (carListTitle !== "Popular Cars")
      setSearchResults({ availableCars: [], unavailableCars: [] });
  };

  // NOTE: handle first render
  useEffect(() => {
    const fetchData = async () => {
      await fetchCars();
      await fetchLocation();
      await fetchTopFive();
      isInit.current = false;
      isFirstRender.current = false;
    };
    fetchData();
    initDate();
  }, []);

  // NOTE: handle when comes from another tab ...
  useEffect(() => {
    if (isFirstRender.current) return;

    if (isScreenFocused) {
      const fetchData = async () => {
        await fetchCars();
        isInit.current = false;
      };
      fetchData();
    } else {
      isInit.current = true;
      resetState();
    }
  }, [isScreenFocused]);

  // NOTE: handle search when all cars has changed in addition to handling screen render
  useEffect(() => {
    if (isFirstRender.current) return;

    if (carListTitle !== "Popular Cars") handleSearch();
  }, [allCars]);

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
    if (!isInit.current) {
      handleSearch();
    }
  }, [filter]);

  // Render Filter screen
  if (showFilter) {
    return (
      <ScrollView style={styles.scrollViewWhite}>
        <View style={[styles.container, { paddingBottom: 60 }]}>
          <View style={styles.filterHeader}>
            <Header title="Filter your car" />
            <TouchableOpacity onPress={() => setShowFilter(false)}>
              <MaterialIcons name="close" size={32} color="black" />
            </TouchableOpacity>
          </View>
          <SubHeader title="Price range (THB/day)" />
          <View style={styles.priceRange}>
            <Input
              value={String(filter.priceRange.minPrice)}
              inputMode="numeric"
              iconName="attach-money"
              onChangeText={(newInput: string) => {
                const newValue = newInput !== "" ? parseInt(newInput) : 0;
                setFilter((prev) => ({
                  ...prev,
                  priceRange: {
                    minPrice: newValue,
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
                const newValue = newInput !== "" ? parseInt(newInput) : 0;
                setFilter((prev) => ({
                  ...prev,
                  priceRange: {
                    minPrice: prev.priceRange.minPrice,
                    maxPrice: newValue,
                  },
                }));
              }}
            />
          </View>
          <SubHeader title="Location" />
          <View style={styles.buttonsContainer}>
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
            <View style={styles.buttonsContainer}>
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
            <View style={styles.buttonsContainer}>
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
            <View style={styles.buttonsContainer}>
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
                {formatDate(filter.pickupDate)}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {showDatePicker && (
            <View style={styles.datePicker}>
              <DatePicker
                value={filter.pickupDate}
                minimumDate={minDate}
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
        {searchResults.availableCars.length > 0 && (
          <SubHeader title={carListTitle} />
        )}
        {searchResults.availableCars.map((carData) => {
          return (
            <CardCarRent
              key={carData.id}
              carData={carData}
              pickupDate={currentPickupDate}
              onPress={() => navigateToCarInfo(carData, currentPickupDate)}
            />
          );
        })}
        {searchResults.unavailableCars.length > 0 && (
          <SubHeader title="Unavailable Cars" />
        )}
        {searchResults.unavailableCars.map((carData) => {
          return (
            <CardCarRent
              key={carData.id}
              carData={carData}
              pickupDate={currentPickupDate}
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
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceRange: {
    flexDirection: "row",
    gap: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});

export default HomeScreen;
