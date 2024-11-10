import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { RentFormScreenProps } from "@appTypes/navigation/navigationTypes";
import { RentFormType } from "@appTypes/screens/screenTypes";
import Header from "@components/headers/Header";
import SubHeader from "@components/headers/SubHeader";
import CardCarModel from "@components/cars/CardCarModel";
import ToggleButton from "@components/buttons/ToggleButton";
import ButtonLarge from "@components/buttons/ButtonLarge";
import Input from "@components/inputs/Input";
import ButtonSmall from "@components/buttons/ButtonSmall";

const RentFormScreen: React.FC<RentFormScreenProps> = ({
  navigation,
  route,
}) => {
  const { carData, pickupDate } = route.params;

  const RADIUS: number = 50; // 50 KM
  const deliveryPrice: number = 300; // 300 THB
  const availableLocation = [
    {
      name: "Bangkok",
      latlng: {
        latitude: 13.7563,
        longitude: 100.5018,
      },
    },
    {
      name: "Phuket",
      latlng: {
        latitude: 7.8789,
        longitude: 98.3983,
      },
    },
    {
      name: "Chiang Mai",
      latlng: {
        latitude: 18.7961,
        longitude: 98.9792,
      },
    },
  ];
  const returnDate: Date = new Date(pickupDate);
  returnDate.setDate(pickupDate.getDate() + 1);

  const [openMap, setOpenMap] = useState<boolean>(false);
  const [region, setRegion] = useState<Region | undefined>();
  const [markerData, setMarkerData] = useState<LatLng>();
  const [locationName, setLocationName] = useState<string>("");
  const [currentLatlng, setCurrentLatlng] = useState<LatLng>();
  const [currentToggleLocation, setCurrentToggleLocation] =
    useState<string>("Current");
  const [form, setForm] = useState<RentFormType>({
    pickupDate: pickupDate,
    returnDate: returnDate,
    pickupType: "Self-pickup",
    pickupLocation: "",
    name: "",
    driverLicense: "",
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const getUserLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const latlng: LatLng = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    return latlng;
  };

  // Set current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      let location = await getUserLocation();
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setMarkerData({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    })();
  }, []);

  const computeDistance = (latlng1: LatLng, latlng2: LatLng): number => {
    const toRadians = (deg: number): number => {
      return (deg * Math.PI) / 180;
    };

    const R = 6371e3; // metres
    const phi1 = toRadians(latlng1.latitude);
    const phi2 = toRadians(latlng2.latitude);
    const delta_phi = toRadians(latlng2.latitude - latlng1.latitude);
    const delta_lambda = toRadians(latlng2.longitude - latlng1.longitude);

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(delta_lambda / 2) *
        Math.sin(delta_lambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;

    return d; // in meters
  };

  const isWithinRadius = (latlng: LatLng): boolean => {
    let isWithinRadius = false;

    // Check if the location is available or not
    availableLocation.forEach((loc) => {
      if (carData.available_location.includes(loc.name)) {
        const distance = computeDistance(loc.latlng, latlng);
        if (distance <= RADIUS * 1000) {
          isWithinRadius = true;
          return;
        }
      }
    });

    return isWithinRadius;
  };

  // Check if selected location is in available range, if yes, set selected location
  const handleSetLocation = (latlng: LatLng) => {
    // Set marker abd region data
    setMarkerData(latlng);

    if (!isWithinRadius(latlng)) {
      setCurrentLatlng(undefined);
      return;
    }

    setCurrentLatlng(latlng);
  };

  const validateForm = () => {
    if (
      form.name.trim() === "" ||
      form.driverLicense.trim() === "" ||
      form.pickupLocation.trim() === ""
    )
      return false;

    if (
      form.pickupType === "Self-pickup" &&
      !carData.available_location.includes(form.pickupLocation)
    )
      return false;

    if (form.driverLicense.trim().length !== 8) return false;

    if (pickupDate.getDate() < new Date(Date.now()).getDate()) return false;

    return true;
  };

  // Validate rent form
  useEffect(() => {
    setIsFormValid(false);

    if (validateForm()) {
      setIsFormValid(true);
    }
  }, [form]);

  const navigateToRentInfo = () => {
    if (validateForm()) {
      navigation.navigate("RentConfirmation", {
        carData: carData,
        rentForm: form,
      });
    }
  };

  if (openMap) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mapScreenContainer}>
          <View>
            <View
              style={{
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "stretch",
                padding: 12,
                gap: 10,
              }}>
              <TouchableOpacity onPress={() => setOpenMap(false)}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <MaterialIcons
                    name="chevron-left"
                    size={32}
                    color="#2B2930"
                  />
                </View>
              </TouchableOpacity>
              <Input
                placeholder="Location name"
                value={locationName}
                onChangeText={setLocationName}
              />
              <ButtonSmall
                title="OK"
                disabled={
                  currentLatlng === undefined || locationName.trim() === ""
                }
                onPress={() => {
                  if (currentLatlng && locationName.trim() !== "") {
                    setForm((prev) => ({
                      ...prev,
                      pickupLocation: `${locationName} (${currentLatlng.latitude.toFixed(
                        6
                      )}°, ${currentLatlng.longitude.toFixed(6)}°)`,
                    }));
                    setRegion((prev) => {
                      if (prev) {
                        return {
                          latitude: currentLatlng.latitude,
                          longitude: currentLatlng.longitude,
                          latitudeDelta: prev.latitudeDelta,
                          longitudeDelta: prev.longitudeDelta,
                        };
                      }
                    });
                    setOpenMap(false);
                  }
                }}
              />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ backgroundColor: "white" }}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  backgroundColor: "white",
                  paddingHorizontal: 12,
                  gap: 6,
                  paddingBottom: 12,
                }}>
                <ToggleButton
                  key="Current"
                  title="Current"
                  isActive={currentToggleLocation === "Current"}
                  onPress={async () => {
                    setCurrentToggleLocation("Current");

                    const userLatlng = await getUserLocation();

                    handleSetLocation(userLatlng);
                    setRegion(() => ({
                      latitude: userLatlng.latitude,
                      longitude: userLatlng.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }));
                  }}
                />
                {carData.available_location.map((location) => {
                  return (
                    <ToggleButton
                      key={location}
                      title={location}
                      isActive={currentToggleLocation === location}
                      onPress={async () => {
                        setCurrentToggleLocation(location);

                        const locData = availableLocation.find(
                          (loc) => loc.name === location
                        );

                        if (locData) {
                          handleSetLocation(locData.latlng);
                          setRegion(() => ({
                            latitude: locData.latlng.latitude,
                            longitude: locData.latlng.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }));
                          return;
                        }
                      }}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
          <MapView
            style={styles.map}
            region={region}
            onRegionChange={(e) => {
              handleSetLocation({
                latitude: e.latitude,
                longitude: e.longitude,
              });
            }}
            onPress={(e) => handleSetLocation(e.nativeEvent.coordinate)}>
            {markerData && <Marker coordinate={markerData} />}
          </MapView>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Header title="Rent information" goBack={() => navigation.goBack()} />
          <CardCarModel carData={carData} />
          <SubHeader title="Color" />
          <View style={styles.buttonsContainer}>
            <ToggleButton title={carData.color} isActive />
          </View>
          <SubHeader title="Pick-up date" />
          <Input
            iconName="calendar-month"
            editable={false}
            value={pickupDate.toLocaleDateString("en-US")}
          />
          <SubHeader title="Return date" />
          <Input
            iconName="calendar-month"
            editable={false}
            value={returnDate.toLocaleDateString("en-US")}
          />
          <SubHeader title="Pick-up type" />
          <View style={styles.buttonsContainer}>
            <ToggleButton
              title="Self-pickup"
              isActive={form.pickupType === "Self-pickup"}
              onPress={() => {
                if (form.pickupType !== "Self-pickup") {
                  setForm((prev) => ({
                    ...prev,
                    pickupType: "Self-pickup",
                    pickupLocation: "",
                  }));
                }
              }}
            />
            <ToggleButton
              title={`Delivery service (+${deliveryPrice} THB)`}
              isActive={form.pickupType === "Delivery service"}
              onPress={() => {
                if (form.pickupType !== "Delivery service") {
                  setForm((prev) => ({
                    ...prev,
                    pickupType: "Delivery service",
                    pickupLocation: "",
                  }));
                }
              }}
            />
          </View>
          <SubHeader title="Location" />
          {form.pickupType === "Self-pickup" && (
            <View style={styles.buttonsContainer}>
              {carData.available_location.map((location) => {
                return (
                  <ToggleButton
                    key={location}
                    title={location}
                    isActive={form.pickupLocation === location}
                    onPress={() => {
                      setForm((prev) => ({
                        ...prev,
                        pickupLocation: location,
                      }));
                    }}
                  />
                );
              })}
            </View>
          )}
          {form.pickupType === "Delivery service" && (
            <Input
              iconName="location-on"
              placeholder="Choose your pick-up location"
              editable={false}
              value={form.pickupLocation}
              onPress={() => setOpenMap(true)}
            />
          )}
          <SubHeader title="Your name" />
          <Input
            value={form.name}
            placeholder="Your name"
            onChangeText={(newName) => {
              setForm((prev) => ({
                ...prev,
                name: newName,
              }));
            }}
          />
          <SubHeader title="Your driver license number" />
          <Input
            value={form.driverLicense}
            inputMode="numeric"
            placeholder="Your driver license number"
            onChangeText={(newNumber) => {
              setForm((prev) => ({
                ...prev,
                driverLicense: newNumber.trim(),
              }));
            }}
          />
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPrice}>Total Price</Text>
            <Text style={styles.totalPrice}>
              {`${
                carData.rental_price +
                (form.pickupType === "Delivery service" ? deliveryPrice : 0)
              } THB`}
            </Text>
          </View>
          <ButtonLarge
            title={`Rent now`}
            disabled={!isFormValid}
            onPress={navigateToRentInfo}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 40,
    paddingHorizontal: 28,
    backgroundColor: "white",
    gap: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  totalPrice: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
  },
  mapScreenContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default RentFormScreen;
