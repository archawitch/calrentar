import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { FirebaseError } from "firebase/app";

import { auth, database } from "@configs/firebaseConfig";

export const getUserEmail = () => {
  const user = auth.currentUser;
  if (user) {
    return user.email;
  }

  return;
};

export const changeUserPassword = async (
  oldPass: string,
  newPass: string
): Promise<{ isSuccess: boolean; msg: string }> => {
  if (oldPass !== newPass) {
    return { isSuccess: false, msg: "Error in changing password" };
  }

  return { isSuccess: false, msg: "Nothing" } ;
};
