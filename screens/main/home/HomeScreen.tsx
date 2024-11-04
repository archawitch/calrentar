import { View, Button, StyleSheet } from "react-native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import {
  HomeStackParamList,
  MainTabParamList,
  RootStackParamList,
} from "@appTypes/navigation/navigationTypes";
import { CompositeNavigationProp } from "@react-navigation/native";

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, "Home">,
  StackNavigationProp<RootStackParamList>
>;

const HomeScreen: React.FC<{ navigation: HomeScreenNavigationProp }> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() =>
          navigation.navigate("Auth", {
            screen: "Login",
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
