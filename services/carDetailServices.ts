import {
    ref,
    get,
  } from "firebase/database";
  
  import { database } from "@configs/firebaseConfig";
  
  import { Car, CarMake, CarDetail } from "@appTypes/cars/carTypes";

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