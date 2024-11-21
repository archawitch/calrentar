import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { FirebaseError } from "firebase/app";

import { auth, database } from "@configs/firebaseConfig";
import { validatePassword } from "./utilsServices";

export const signup = async (
  username: string,
  password: string,
  confirmPassword: string
): Promise<{ isSuccess: boolean; msg: string }> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(username)) {
    return { isSuccess: false, msg: "Email is invalid" };
  }

  const passValidation = validatePassword(password, confirmPassword);
  if (!passValidation.isSuccess) {
    return { isSuccess: false, msg: passValidation.msg};
  }

  try {
    await createUserWithEmailAndPassword(auth, username, password);
    return { isSuccess: true, msg: "Signup successful" };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      console.log(error.message);
      let errorMsg: string = error.message;

      switch (error.code) {
        case "auth/invalid-email":
          errorMsg = "Email is invalid";
          break;
        case "auth/email-already-in-use":
          errorMsg = "Email is already in-use";
          break;
        default:
          errorMsg = error.message;
      }

      return { isSuccess: false, msg: errorMsg };
    }

    console.log(`Unknown error: ${error}`);
    return { isSuccess: false, msg: "Unknown error" };
  }
};

export const login = async (
  username: string,
  password: string
): Promise<{ isSuccess: boolean; msg: string }> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(username)) {
    return { isSuccess: false, msg: "Email is invalid" };
  }

  try {
    await signInWithEmailAndPassword(auth, username, password);
    console.log(`${username} login successful`);
    return { isSuccess: true, msg: "Login successful" };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      console.log(error.message);
      let errorMsg: string = error.message;

      switch (error.code) {
        case "auth/invalid-email":
          errorMsg = "Email is invalid";
          break;
        case "auth/invalid-credential":
          errorMsg = "Email or password is incorrect";
          break;
        default:
          errorMsg = error.message;
      }

      return { isSuccess: false, msg: errorMsg };
    }

    console.log(`Unknown error: ${error}`);
    return { isSuccess: false, msg: "Unknown error" };
  }
};
