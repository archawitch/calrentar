import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { AuthStackParamList } from "@appTypes/navigation/navigationTypes";
import AuthInput from "@components/inputs/AuthInput";
import ButtonLarge from "@components/buttons/ButtonLarge";
import Alert from "@components/alert/Alert";

import { signup } from "@services/authServices";

type SignupScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Signup"
>;

const SignupScreen: React.FC<{ navigation: SignupScreenNavigationProp }> = ({
  navigation,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleSignup = async () => {
    if (!isPressed) {
      // Disable sign up button
      setIsPressed(true);

      // Signup logic
      const { isSuccess, msg } = await signup(email, password, confirmPassword);

      // Update status
      !isSuccess ? alert(msg) : setIsAuthenticated(isSuccess);

      // Enable sign up button
      setIsPressed(false);
    }
  };

  // Toggle alert popup when clicking sign up button
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        // if success, navigate to Log in screen
        navigation.goBack();
      }, 3000);
    }
  }, [isAuthenticated]);

  return !isAuthenticated ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("@assets/images/illustrations/signup-illustration.png")}></Image>
        </View>
        <Text style={styles.title}>Create an account</Text>
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
            placeholder="must be at least 8 characters"
            secureTextEntry
          />
          <AuthInput
            label="Confirm Password"
            inputText={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="must be at least 8 characters"
            secureTextEntry
          />
        </View>
        <ButtonLarge title="Sign up" onPress={handleSignup} />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text
              style={styles.loginButton}
              onPress={() => navigation.goBack()}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  ) : (
    <Alert
      type="auth"
      isSuccess={isAuthenticated}
      title="Signup successfully"
      details="Log in and enjoy our cars for rent!"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 14,
    paddingBottom: 24,
    paddingHorizontal: 28,
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 226,
    height: 148,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    marginTop: 28,
    marginBottom: 24,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 40,
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 56,
  },
  loginText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  loginButton: {
    fontFamily: "Poppins_700Bold",
  },
});

export default SignupScreen;
