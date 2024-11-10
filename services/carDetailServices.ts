import {
    ref,
    get,
  } from "firebase/database";
  
  import { database } from "@configs/firebaseConfig";
  
  import { CarDetail } from "@appTypes/cars/carTypes";

  export const getCarDetail = async (carId: number): Promise<CarDetail | void> => {
    const dataRef = ref(database, `car_details/${carId}`);
  
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const carDetail: CarDetail = snapshot.val();
        console.log(carDetail);
  
        return carDetail;
      } else {
        console.log("No data available");
        return;
      }
    } catch (error: any) {
      console.log(error);
      return;
    }
  };

  export const getCarLogo = (make: string) => {
    const carLogo: Record<string, string> = {
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
  
  // front images
  export const getCarImage = (id: number) => {
    const carImage: Record<number, string> = {
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