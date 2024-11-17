import { ref, get, update, onValue, DataSnapshot, Unsubscribe } from "firebase/database";
import { auth, database } from "@configs/firebaseConfig";
import { Car } from "@appTypes/cars/carTypes";

export const getSavedCars = (callback: (cars: Car[]) => void) => {
  if (!auth.currentUser) {
    alert("You haven't logged in");
    return;
  }

  const savedCarsRef = ref(database, `saved_cars/${auth.currentUser.uid}`);

  // Set up the real-time listener and call the callback with snapshot data
  const unsubscribe = onValue(savedCarsRef, async (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const carList = await createCarList(snapshot);
    callback(carList);
  });

  // Return the unsubscribe function
  return unsubscribe;
};

const createCarList = async (savedCarIdsSnapshot: DataSnapshot): Promise<Car[]> => {
  try {
    const data = savedCarIdsSnapshot.val();
    const savedCarIds: number[] = Object.keys(data).map((id) => Number(id));

    // Fetch all cars concurrently
    const savedCars = await Promise.all(
      savedCarIds.map((carId) => getCar(carId))
    );

    return savedCars;
  } catch (error: any) {
    console.error("Error fetching saved cars:", error);
    return [];
  }
};

const getCar = async (carId: number): Promise<Car> => {
  const carRef = ref(database, `cars/${carId}`);
  const carSnapshot = await get(carRef);

  if (!carSnapshot.exists()) {
    alert(`Car with ID ${carId} not found`);
  }

  return carSnapshot.val() as Car;
};

export const getSaveStatus = (carId: number, callback: (status: boolean) => void) => {
  if (!auth.currentUser) {
    return;
  }

  const userSavedCarRef = ref(
    database,
    `saved_cars/${auth.currentUser.uid}/${carId}`
  );

  // Set up the real-time listener and call the callback with snapshot data
  const unsubscribe = onValue(userSavedCarRef, (snapshot) => {
    callback(snapshot.exists());
  });

  // Return the unsubscribe function
  return unsubscribe;
};

export const updateSaveStatus = async (
  carId: number
): Promise<{ isSuccess: boolean; msg: string }> => {
  if (!auth.currentUser) {
    return { isSuccess: false, msg: "You haven't logged in" };
  }

  const userSavedCarRef = ref(
    database,
    `saved_cars/${auth.currentUser.uid}`
  );

  try {
    // Retrieve the save status of the car
    let isSaved = false;
    const unsubscribe = getSaveStatus(carId, (status: boolean) => {
      isSaved = status;
    });

    // Toggle the save status
    await update(userSavedCarRef, { [carId]: isSaved ? null : true });

    return {
      isSuccess: true,
      msg: "Update saved cars successfully",
    };
  } catch (error: any) {
    console.error("Error updating saved cars:", error);
  }

  return { isSuccess: false, msg: "Error updating saved car" };
};
