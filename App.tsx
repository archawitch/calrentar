import React, { useEffect } from "react";
import { LogBox } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import RootNavigation from "@navigation/RootNavigation";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "firebase/auth: Auth",
]);

const App: React.FC = () => {
  // Loading fonts
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <RootNavigation></RootNavigation>;
};

export default App;
