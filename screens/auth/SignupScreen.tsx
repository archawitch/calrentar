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
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleSignup = () => {
    setIsPressed(true);

    // TODO: handle sign up logic here ...
    const result: boolean = true;

    // update status
    setIsAuthenticated(result);
  };

  const getAlertTitle = () => {
    if (isAuthenticated) return "Signup successfully";
    else return "Signup failed";
  };

  const getAlertDetails = () => {
    if (isAuthenticated) return "Log in and enjoy our cars for rent!";
    else return "Please check your email or password again.";
  };

  // Toggle alert popup when clicking sign up button
  useEffect(() => {
    if (isPressed) {
      setTimeout(() => {
        if (!isAuthenticated) {
          setIsPressed(false);
          return;
        }
        // if success, navigate to Log in screen
        navigation.goBack();
      }, 3000);
    }
  }, [isPressed]);

  return !isPressed ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <Alert
      type="auth"
      isSuccess={isAuthenticated}
      title={getAlertTitle()}
      details={getAlertDetails()}
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
