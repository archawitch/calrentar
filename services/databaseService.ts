import { ref, get, set, DataSnapshot } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, database } from "../configs/firebaseConfig";


