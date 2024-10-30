import { FirebaseApp, initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "secret",
  authDomain: "des427-09.firebaseapp.com",
  projectId: "des427-09",
  storageBucket: "des427-09.appspot.com",
  messagingSenderId: "262527075216",
  appId: "1:262527075216:web:31ed973087c7bff2746915",
  databaseURL:
    "https://des427-09-default-rtdb.asia-southeast1.firebasedatabase.app",
};

if (!getApps.length) {
  initializeApp(firebaseConfig);
}

export const database: Database = getDatabase();
export const auth: Auth = getAuth();
