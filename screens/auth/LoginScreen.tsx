import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { LoginScreenNavigationProp } from "@appTypes/navigation/navigationTypes";
import AuthInput from "@components/inputs/AuthInput";
import ButtonLarge from "@components/buttons/ButtonLarge";

import { login } from "@services/authServices";

const LoginScreen: React.FC<LoginScreenNavigationProp> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!isPressed) {
      // Login logic
      const { isSuccess, msg } = await login(email, password);

      // If authenticated, navigate to the Home screen
      // Else, show pop up alert
      if (isSuccess) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "Main",
              params: { screen: "HomeTab", params: { screen: "Home" } },
            },
          ],
        });
        return;
      }

      // show the alert pop up
      alert(msg);
    }

    // Enable login button
    setIsPressed(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <Image
          style={styles.image}
          source={require("@assets/images/illustrations/login-illustration.png")}></Image>
        <Text style={styles.title}>Log in</Text>
        <View style={styles.inputContainer}>
          <AuthInput
            label="Email"
            inputText={email}
            onChangeText={setEmail}
            placeholder="Your email"
          />
          <AuthInput
            label="Password"
            inputText={password}
            onChangeText={setPassword}
            placeholder="Your password"
            secureTextEntry
          />
        </View>
        <ButtonLarge
          title="Log in"
          disabled={isPressed}
          onPress={() => {
            setIsPressed(true);
            handleLogin();
          }}
        />
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            Don't have an account?{" "}
            <Text
              style={styles.signUpButton}
              onPress={() => navigation.navigate("Signup")}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 28,
    backgroundColor: "white",
  },
  image: {
    width: 337,
    height: 222,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    marginTop: 44,
    marginBottom: 26,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 40,
  },
  signUpContainer: {
    alignItems: "center",
    marginTop: 52,
  },
  signUpText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  signUpButton: {
    fontFamily: "Poppins_700Bold",
  },
});

export default LoginScreen;
