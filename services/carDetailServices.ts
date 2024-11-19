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
      0: require("@assets/images/car-images/0-front.png"),
      1: require("@assets/images/car-images/1-front.png"),
      2: require("@assets/images/car-images/2-front.png"),
      3: require("@assets/images/car-images/3-front.png"),
      4: require("@assets/images/car-images/4-front.png"),
      5: require("@assets/images/car-images/5-front.png"),
      6: require("@assets/images/car-images/6-front.png"),
      7: require("@assets/images/car-images/7-front.png"),
      8: require("@assets/images/car-images/8-front.png"),
      9: require("@assets/images/car-images/9-front.png"),
      10: require("@assets/images/car-images/10-front.png"),
      11: require("@assets/images/car-images/11-front.png"),
      12: require("@assets/images/car-images/12-front.png"),
      13: require("@assets/images/car-images/13-front.png"),
      14: require("@assets/images/car-images/14-front.png"),
      15: require("@assets/images/car-images/15-front.png"),
      16: require("@assets/images/car-images/16-front.png"),
      17: require("@assets/images/car-images/17-front.png"),
      18: require("@assets/images/car-images/18-front.png"),
      19: require("@assets/images/car-images/19-front.png"),
      20: require("@assets/images/car-images/20-front.png"),
      21: require("@assets/images/car-images/21-front.png"),
      22: require("@assets/images/car-images/22-front.png"),
      23: require("@assets/images/car-images/23-front.png"),
      24: require("@assets/images/car-images/24-front.png"),
    };
  
    return carImage[id];
  };