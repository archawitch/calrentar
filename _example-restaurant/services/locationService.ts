import * as Location from "expo-location";

interface LocationInterface {
  status: Location.PermissionStatus;
  location: Location.LocationObject | null;
  newRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null;
}

export const getLocation = async (): Promise<LocationInterface> => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return { status: status, location: null, newRegion: null };
  }

  const location = await Location.getCurrentPositionAsync({});
  const newRegion = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return { status: status, location: location, newRegion: newRegion };
};
