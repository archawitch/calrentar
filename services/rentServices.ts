import {
  ref,
  push,
  set,
  runTransaction,
} from "firebase/database";
import { auth, database } from "@configs/firebaseConfig";

import { History, HistoryToStore } from "@appTypes/history/historyTypes";

export const rentCar = async (
  rentInfo: History
): Promise<{ isSuccess: boolean; msg: string }> => {
  const { car_id, pickup_date, return_date, driver_license_no } = rentInfo;

  if (!validateDriverLicense(driver_license_no)) {
    return { isSuccess: false, msg: "Invalid driver license" };
  }

  let sPickupDate: string = pickup_date.toISOString().split("T")[0];
  let sReturnDate: string = return_date.toISOString().split("T")[0];

  // Run transaction to prevent overlapping rent
  if (!(await addCarRentDate(car_id, sPickupDate))) {
    return { isSuccess: false, msg: "Sorry, the car is not available" };
  }

  if (!auth.currentUser) {
    return { isSuccess: false, msg: "You haven't logged in" };
  }

  const newRentInfo: HistoryToStore = {
    ...rentInfo,
    pickup_date: sPickupDate,
    return_date: sReturnDate,
    user_id: auth.currentUser.uid,
  };

  if (!(await addRentInfo(newRentInfo))) {
    return { isSuccess: false, msg: "Error adding rent info" };
  }

  return { isSuccess: true, msg: "Rent Successful" };
};

const validateDriverLicense = (licenseNo: string): boolean => {
  return licenseNo.length == 8;
};

const addCarRentDate = async (
  carId: number,
  rentDate: string
): Promise<boolean> => {
  const rentCountRef = ref(database, `cars/${carId}/rent_count`);
  const rentDateRef = ref(database, `cars/${carId}/rent_date`);

  try {
    const rentDateResult = await runTransaction(rentDateRef, (rentDateKey) => {
      // Check if the desired rental date is already booked
      if (rentDateKey && rentDateKey[rentDate]) {
        // console.log("Can unavailable");
        return;
      }

      // If date is available, add it to rent_date and increment rent_count
      if (!rentDateKey) {
        // console.log("Initialize rent date");
        rentDateKey = {};
      }
      rentDateKey[rentDate] = true;

      return rentDateKey; // Commit the transaction with updated carData
    });

    const rentCountResult = await runTransaction(rentCountRef, (rentCount) => {
      rentCount = (rentCount || 0) + 1;

      return rentCount; // Commit the transaction with updated carData
    });

    return (rentDateResult.committed && rentCountResult.committed) ? true : false;
  } catch (error: any) {
    console.error("Error renting car:", error);
    return false;
  }
};

const addRentInfo = async (rentInfo: HistoryToStore): Promise<boolean> => {
  // Generate unique key for new child
  const newRentInfoRef = push(ref(database, "rent_info"));

  // Push new child into the rent_info
  try {
    await set(newRentInfoRef, rentInfo);
  } catch (error: any) {
    console.error("Error adding rent info");
    return false;
  }

  // Push new child into user_rent_info
  const userRentInfoRef = ref(
    database,
    `user_rent_info/${rentInfo.user_id}/${newRentInfoRef.key}`
  );

  try {
    await set(userRentInfoRef, {
      car_id: rentInfo.car_id,
      make: rentInfo.make,
      model: rentInfo.model,
      pickup_date: rentInfo.pickup_date,
      return_date: rentInfo.return_date,
      price_paid: rentInfo.price_paid
    });
  } catch (error: any) {
    console.error("Error adding rent info to user");
    return false;
  }

  return true;
};
