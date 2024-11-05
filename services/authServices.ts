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
): Promise<{ isSuccess: boolean; msg: string }> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  if (!emailRegex.test(username)) {
    return { isSuccess: false, msg: "Email is invalid" };
  } else if (password !== confirmPassword) {
    return { isSuccess: false, msg: "Passwords do not match" };
  } else if (password.length < 8) {
    return {
      isSuccess: false,
      msg: "Password must have at least 8 characters",
    };
  } else if (!passwordRegex.test(password)) {
    return {
      isSuccess: false,
      msg: "Password must be at least 8 characters, including one uppercase letter (A-Z), one lowercase letter (a-z), one number (0-9), and one special character (e.g., !, @, #, $)",
    };
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
