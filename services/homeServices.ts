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
    Toyota: require("@assets/logos/toyota.png"),
    Honda: require("@assets/logos/honda.png"),
    Chevrolet: require("@assets/logos/chevrolet.png"),
    BMW: require("@assets/logos/bmw.png"),
    "Mercedes-Benz": require("@assets/logos/mercedes_benz.png"),
    Volkswagen: require("@assets/logos/volkswagen.png"),
    Hyundai: require("@assets/logos/hyundai.png"),
    Kia: require("@assets/logos/kia.png"),
    Mazda: require("@assets/logos/mazda.png"),
    Subaru: require("@assets/logos/subaru.png"),
    Acura: require("@assets/logos/acura.png"),
    Volvo: require("@assets/logos/volvo.png"),
  };

  return carLogo[make];
};

// side images
export const getCarImage = (id: number) => {
  const carImage: Record<number, any> = {
    0: require("@assets/images/car-images/0-side.png"),
    1: require("@assets/images/car-images/1-side.png"),
    2: require("@assets/images/car-images/2-side.png"),
    3: require("@assets/images/car-images/3-side.png"),
    4: require("@assets/images/car-images/4-side.png"),
    5: require("@assets/images/car-images/5-side.png"),
    6: require("@assets/images/car-images/6-side.png"),
    7: require("@assets/images/car-images/7-side.png"),
    8: require("@assets/images/car-images/8-side.png"),
    9: require("@assets/images/car-images/9-side.png"),
    10: require("@assets/images/car-images/10-side.png"),
    11: require("@assets/images/car-images/11-side.png"),
    12: require("@assets/images/car-images/12-side.png"),
    13: require("@assets/images/car-images/13-side.png"),
    14: require("@assets/images/car-images/14-side.png"),
    15: require("@assets/images/car-images/15-side.png"),
    16: require("@assets/images/car-images/16-side.png"),
    17: require("@assets/images/car-images/17-side.png"),
    18: require("@assets/images/car-images/18-side.png"),
    19: require("@assets/images/car-images/19-side.png"),
    20: require("@assets/images/car-images/20-side.png"),
    21: require("@assets/images/car-images/21-side.png"),
    22: require("@assets/images/car-images/22-side.png"),
    23: require("@assets/images/car-images/23-side.png"),
    24: require("@assets/images/car-images/24-side.png"),
  };

  return carImage[id];
};
