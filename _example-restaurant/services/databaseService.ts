import { ref, get, set, DataSnapshot } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, database } from "./firebaseConfig";
import { RestaurantData } from "../types/types";

export const getRestaurants = async (): Promise<RestaurantData[] | void> => {
  const restaurantRef = ref(database, "restaurant/");

  try {
    const snapshot = await get(restaurantRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Assuming data is an object with numeric keys or an array
      const restaurantList: RestaurantData[] = Object.values(data);
      console.log(restaurantList);

      return restaurantList;
    } else {
      console.log("No data available");
      return;
    }
  } catch (error: any) {
    console.log(error);
    return;
  }
};

export const saveRestaurant = (
  restaurantIndex: number | undefined,
  newResData: any
) => {
  set(ref(database, "restaurant/" + restaurantIndex), newResData);
};

export const signup = async (
  username: string,
  password: string,
  confirmPassword: string
): Promise<{ success: boolean; msg: string }> => {
  if (password !== confirmPassword) {
    return { success: false, msg: "Passwords do not match" };
  }

  try {
    await createUserWithEmailAndPassword(auth, username, password);
    return { success: true, msg: "Signup successful" };
  } catch (error: any) {
    console.log(error.code);
    console.log(error.message);
    return { success: false, msg: error.message };
  }
};

export const login = async (
  username: string,
  password: string
): Promise<{ success: boolean; msg: string }> => {
  try {
    await signInWithEmailAndPassword(auth, username, password);
    console.log("login successful");
    return { success: true, msg: "Signup successful" };
  } catch (error: any) {
    console.log(error.code);
    console.log(error.message);
    return { success: false, msg: error.message };
  }
};
