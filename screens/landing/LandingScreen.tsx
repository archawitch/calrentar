import { View, StyleSheet, ImageBackground } from "react-native";

import { LandingScreenNavigationProp } from "@appTypes/navigation/navigationTypes";
import ButtonLarge from "@components/buttons/ButtonLarge";

const LandingScreen: React.FC<LandingScreenNavigationProp> = ({
  onContinue,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        resizeMode="cover"
        source={require("@assets/images/landing/landing.gif")}>
        <ButtonLarge title="Get started" onPress={onContinue} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 50,
    paddingHorizontal: 20,
    justifyContent: "flex-end",
  },
});

export default LandingScreen;
