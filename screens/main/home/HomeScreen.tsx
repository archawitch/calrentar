import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CompositeNavigationProp } from "@react-navigation/native";

import {
  HomeStackParamList,
  RootStackParamList,
} from "@appTypes/navigation/navigationTypes";
import { CarData } from "@appTypes/cars/carTypes";

import Input from "@components/inputs/Input";
import SubHeader from "@components/headers/SubHeader";
import ToggleButton from "@components/buttons/ToggleButton";
import Header from "@components/headers/Header";
import ButtonSmall from "@components/buttons/ButtonSmall";
import CardCar from "@components/cars/CardCar";
import CardCarHeader from "@components/cars/CardCarHeader";
import ImageContain from "@components/images/ImageContain";

// import { getCars } from "@services/homeServices"

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, "Home">,
  StackNavigationProp<RootStackParamList>
>;

type CarFilterType = {
  searchInput: string;
  pickupDate: Date | undefined;
  priceRange: {
    minPice: number | undefined;
    maxPrice: number | undefined;
  };
  location: string[];
  makes: string[];
  models: string[];
  colors: string[];
};

const HomeScreen: React.FC<{ navigation: HomeScreenNavigationProp }> = ({
  navigation,
}) => {
  // NOTE: Mock up cars (Don't forget to remove)
  const allCars: CarData[] = [
    {
      id: Math.round(Math.random() * 10000),
      make: "Honda",
      model: "Civic",
      color: "White",
      seats: 5,
      horse_power: 300,
      transmission: "auto",
      year_produced: 2023,
      rental_price: 1500,
      available_location: ["Bangkok", "Chiang Mai"],
    },
    {
      id: Math.round(Math.random() * 10000),
      make: "Mercedez-Benz",
      model: "Maybach S580",
      color: "Black",
      seats: 5,
      horse_power: 600,
      transmission: "auto",
      year_produced: 2023,
      rental_price: 1500,
      available_location: ["Bangkok", "Phuket"],
    },
    {
      id: Math.round(Math.random() * 10000),
      make: "Mercedez-Benz",
      model: "AMG G63",
      color: "Silver",
      seats: 7,
      horse_power: 750,
      transmission: "auto",
      year_produced: 2024,
      rental_price: 1500,
      available_location: ["Phuket"],
    },
  ];
  const allLocations = ["Bangkok", "Phuket", "Chiang Mai"];

  const [searchResults, setSearchResults] = useState<CarData[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const [filter, setFilter] = useState<CarFilterType>({
    searchInput: "",
    pickupDate: new Date(Date.now()),
    priceRange: {
      minPice: 0,
      maxPrice: 50000,
    },
    location: ["Bangkok", "Phuket", "Chiang Mai"],
    makes: [],
    models: [],
    colors: [],
  });
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // NOTE: Handle searching based on filters
  const handleSearch = () => {
    // TODO: handle searching cars here ...

    // Mock up
    const newSearchResults = [
      ...searchResults,
      {
        id: Math.round(Math.random() * 10000),
        make: "Honda",
        model: "Civic",
        color: "White",
        seats: 5,
        horse_power: 300,
        transmission: "auto",
        year_produced: 2023,
        rental_price: 1500,
        available_location: ["Bangkok", "Chiang Mai"],
      },
    ];

    // Parse search results
    setSearchResults(newSearchResults);
  };

  // NOTE: Handle to navigate to car information
  const navigateToCarInfo = () => {
    navigation.navigate("CarInformation");
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

  // TODO: retrieve logo image by car make here ...
  const getLogo = (make: string) => {
    // Mock up
    return require("@assets/images/illustrations/login-illustration.png");
  };

  // TODO: retrieve car image by id here ...
  const getCarImage = (id: number) => {
    // Mock up
    return require("@assets/images/illustrations/signup-illustration.png");
  };

  // TODO: retrieve popular cars list here ...
  useEffect(() => {
    // Get popular car list and display when first render

    // Mock up
    setSearchResults([allCars[1], allCars[2]]);
  }, []);

  // TODO: handle location selection ...
  useEffect(() => {
    const newMakes = getMakes();
    setMakes(newMakes);
    setFilter((prev) => ({
      ...prev,
      makes: newMakes.filter((make) => prev.makes.includes(make)),
    }));
  }, [filter.location]);

  // TODO: handle makes selection
  useEffect(() => {
    const newModels = getModels();
    setModels(newModels);
    setFilter((prev) => ({
      ...prev,
      models: newModels.filter((model) => prev.models.includes(model)),
    }));
  }, [filter.makes]);

  // TODO: handle models selection
  useEffect(() => {
    const newColors = getColors();
    setColors(newColors);
    setFilter((prev) => ({
      ...prev,
      colors: newColors.filter((color) => prev.colors.includes(color)),
    }));
  }, [filter.models]);

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
          <SubHeader title="Pick-up date" />
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
                testID="dateTimePickerFilter"
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
          <SubHeader title="Price range (THB/day)" />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Input
              value={String(filter.priceRange.minPice)}
              inputMode="numeric"
              iconName="attach-money"
              onChangeText={(newInput: string) => {
                setFilter((prev) => ({
                  ...prev,
                  priceRange: {
                    minPice: Number(newInput),
                    maxPrice: prev.priceRange.minPice,
                  },
                }));
              }}
            />
            <Input
              value={String(filter.priceRange.maxPrice)}
              inputMode="numeric"
              iconName="attach-money"
              onChangeText={(newInput: string) => {
                setFilter((prev) => ({
                  ...prev,
                  priceRange: {
                    minPice: prev.priceRange.minPice,
                    maxPrice: Number(newInput),
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
                  if (!filter.location.includes(location)) {
                    setFilter((prev) => ({
                      ...prev,
                      location: [...prev.location, location],
                    }));
                  } else {
                    setFilter((prev) => ({
                      ...prev,
                      location: prev.location.filter((loc) => loc !== location),
                    }));
                  }
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
                    if (!filter.makes.includes(make)) {
                      setFilter((prev) => ({
                        ...prev,
                        makes: [...prev.makes, make],
                      }));
                    } else {
                      setFilter((prev) => ({
                        ...prev,
                        makes: prev.makes.filter((m) => m !== make),
                      }));
                    }
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
                    if (!filter.models.includes(model)) {
                      setFilter((prev) => ({
                        ...prev,
                        models: [...prev.models, model],
                      }));
                    } else {
                      setFilter((prev) => ({
                        ...prev,
                        models: prev.models.filter((m) => m !== model),
                      }));
                    }
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
                    if (!filter.colors.includes(color)) {
                      setFilter((prev) => ({
                        ...prev,
                        colors: [...prev.colors, color],
                      }));
                    } else {
                      setFilter((prev) => ({
                        ...prev,
                        colors: prev.colors.filter((c) => c !== color),
                      }));
                    }
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
        {searchResults.map((car) => {
          return (
            <CardCar
              key={car.id}
              header={
                <CardCarHeader logo={getLogo(car.make)} model="Maybach S580" />
              }
              image={<ImageContain source={getCarImage(car.id)} />}
              button={
                <ButtonSmall
                  title={`Rent now at ${car.rental_price}THB/day`}
                  onPress={navigateToCarInfo}
                />
              }
              onPress={navigateToCarInfo}
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
    paddingVertical: 16,
    gap: 16,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
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
  button: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#2B2930",
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "white",
  },
  subtitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    marginTop: 16,
  },
  card: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardLogo: {
    width: 32,
    height: 32,
  },
  carName: {
    fontSize: 18,
    flex: 1,
  },
  cardCar: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  cardCarImage: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },
});

export default HomeScreen;
