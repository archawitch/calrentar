import { ref, get, query, limitToFirst, orderByChild } from "firebase/database";

import { database } from "@configs/firebaseConfig";

import { Car } from "@appTypes/cars/carTypes";

export const getCars = async (): Promise<Car[] | void> => {
  const dataRef = ref(database, "cars/");

  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const carList: Car[] = Object.values(data);

      return carList;
    } else {
      console.log("No data available");
      return;
    }
  } catch (error: any) {
    console.log(error);
    return;
  }
};

export const getLocations = async (): Promise<string[] | void> => {
  const dataRef = ref(database, "locations");

  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const locations: string[] = Object.values(data);

      return locations;
    } else {
      console.log("No data available");
      return;
    }
  } catch (error: any) {
    console.log(`location: ${error}`);
    return;
  }
};

export const getTopFive = async (): Promise<Car[] | void> => {
  const dataRef = query(
    ref(database, "cars"),
    orderByChild("rent_count"),
    limitToFirst(5)
  );

  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const carList: Car[] = Object.values(data);

      return carList;
    } else {
      console.log("No data available");
      return;
    }
  } catch (error: any) {
    console.log(`TopFiveCars: ${error}`);
    return;
  }
};

export const getCarLogo = (make: string) => {
  const carLogo: Record<string, any> = {
    Toyota: require("@assets/images/illustrations/login-illustration.png"),
    Honda: require("@assets/images/illustrations/login-illustration.png"),
    Chevrolet: require("@assets/images/illustrations/login-illustration.png"),
    BMW: require("@assets/images/illustrations/login-illustration.png"),
    "Mercedes-Benz": require("@assets/images/illustrations/login-illustration.png"),
    Volkswagen: require("@assets/images/illustrations/login-illustration.png"),
    Hyundai: require("@assets/images/illustrations/login-illustration.png"),
    Kia: require("@assets/images/illustrations/login-illustration.png"),
    Mazda: require("@assets/images/illustrations/login-illustration.png"),
    Subaru: require("@assets/images/illustrations/login-illustration.png"),
    Acura: require("@assets/images/illustrations/login-illustration.png"),
    Volvo: require("@assets/images/illustrations/login-illustration.png"),
  };

  return carLogo[make];
};

// side images
export const getCarImage = (id: number) => {
  const carImage: Record<number, any> = {
    0: require("@assets/images/illustrations/signup-illustration.png"),
    1: require("@assets/images/illustrations/signup-illustration.png"),
    2: require("@assets/images/illustrations/signup-illustration.png"),
    3: require("@assets/images/illustrations/signup-illustration.png"),
    4: require("@assets/images/illustrations/signup-illustration.png"),
    5: require("@assets/images/illustrations/signup-illustration.png"),
    6: require("@assets/images/illustrations/signup-illustration.png"),
    7: require("@assets/images/illustrations/signup-illustration.png"),
    8: require("@assets/images/illustrations/signup-illustration.png"),
    9: require("@assets/images/illustrations/signup-illustration.png"),
    10: require("@assets/images/illustrations/signup-illustration.png"),
    11: require("@assets/images/illustrations/signup-illustration.png"),
    12: require("@assets/images/illustrations/signup-illustration.png"),
    13: require("@assets/images/illustrations/signup-illustration.png"),
    14: require("@assets/images/illustrations/signup-illustration.png"),
    15: require("@assets/images/illustrations/signup-illustration.png"),
    16: require("@assets/images/illustrations/signup-illustration.png"),
    17: require("@assets/images/illustrations/signup-illustration.png"),
    18: require("@assets/images/illustrations/signup-illustration.png"),
    19: require("@assets/images/illustrations/signup-illustration.png"),
    20: require("@assets/images/illustrations/signup-illustration.png"),
    21: require("@assets/images/illustrations/signup-illustration.png"),
    22: require("@assets/images/illustrations/signup-illustration.png"),
    23: require("@assets/images/illustrations/signup-illustration.png"),
    24: require("@assets/images/illustrations/signup-illustration.png"),
  };

  return carImage[id];
};
