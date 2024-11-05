import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
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

  return (
    <SafeAreaView style={styles.container}>
      <RootNavigation></RootNavigation>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height,
  },
});

export default App;
