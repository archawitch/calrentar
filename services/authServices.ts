import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { FirebaseError } from "firebase/app";

import { auth, database } from "@configs/firebaseConfig";

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
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      console.log(error.message);
      let errorMsg: string = error.message;
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg = "Email is invalid";
          break;
        case "auth/weak-password":
          errorMsg = "Password must have at least 8 characters";
          break;
        case "auth/password-does-not-meet-requirements":
          errorMsg = "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g., !, @, #, $, %, &, *)"
          break;
        default:
          errorMsg = error.message
      }

      return { success: false, msg: errorMsg}
    }

    console.log(`Unknown error: ${error}`)
    return { success: false, msg: "Unknown error" };
  }
};

export const login = async (
  username: string,
  password: string
): Promise<{ success: boolean; msg: string }> => {
  try {
    await signInWithEmailAndPassword(auth, username, password);
    console.log(`${username} login successful`);
    return { success: true, msg: "Login successful" };
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
          errorMsg = "Email or password is incorrect"
          break;
        default:
          errorMsg = error.message
      }

      return { success: false, msg: errorMsg}
    }

    console.log(`Unknown error: ${error}`)
    return { success: false, msg: "Unknown error" };
  }
};
