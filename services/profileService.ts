import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import { FirebaseError } from "firebase/app";

import { auth } from "@configs/firebaseConfig";
import { validatePassword } from "./utilsServices";

export const getUserEmail = () => {
  const user = auth.currentUser;
  if (user) {
    return user.email;
  }

  return;
};

export const changeUserPassword = async (
  oldPass: string,
  newPass: string,
  confirmPass: string
): Promise<{ isSuccess: boolean; msg: string }> => {
  const user = auth.currentUser;
  if (!user || !user.email) {
    return { isSuccess: false, msg: "You haven't logged in" };
  }

  try {
    const authCredtial = EmailAuthProvider.credential(user.email, oldPass);
    await reauthenticateWithCredential(user, authCredtial);

    const passValidation = validatePassword(newPass, confirmPass);
    if (!passValidation.isSuccess) {
      return { isSuccess: false, msg: passValidation.msg };
    }

    await updatePassword(user, newPass);

    return { isSuccess: true, msg: "Successfully changed password" };
  } catch (error: any) {
    console.error("Error during changing password:", error);
    if (
      error instanceof FirebaseError &&
      error.code === "auth/invalid-credential"
    ) {
      return { isSuccess: false, msg: "Password is incorrect" };
    }
  }

  return { isSuccess: false, msg: "Error during changing password: Unknown error" };
};
