import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

import { login, signup } from "../services/databaseService";

interface SignupLoginProps {
  loginCB: () => void;
}

const SignupLogin: React.FC<SignupLoginProps> = ({ loginCB }) => {
  // State variables
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showLogin, setShowLogin] = useState<boolean>(true);

  // Handler to toggle to Login view
  const toggleShowLogin = () => {
    setShowLogin(true);
  };

  // Handler to toggle to Signup view
  const toggleShowSignup = () => {
    setShowLogin(false);
  };

  // Handler for Login action
  const doLogin = async () => {
    const { success, msg } = await login(username, password);
    if (!success) {
      alert(msg);
      return;
    }

    loginCB();
  };

  // Handler for Signup action
  const doSignup = async () => {
    const { success, msg } = await signup(username, password, confirmPassword);
    if (!success) {
      alert(msg);
      return;
    }

    setShowLogin(true);
  };

  // Render Signup form
  const renderSignup = () => (
    <View>
      <View style={styles.group}>
        <Text style={styles.title}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
        />
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
        />
      </View>
      <View style={styles.center}>
        <View style={styles.group}>
          <TouchableOpacity onPress={toggleShowLogin}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.group}>
          <TouchableOpacity style={styles.button} onPress={doSignup}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Render Login form
  const renderLogin = () => (
    <View>
      <View style={styles.group}>
        <Text style={styles.title}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
        />
      </View>
      <View style={styles.center}>
        <View style={styles.group}>
          <TouchableOpacity onPress={toggleShowSignup}>
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.group}>
          <TouchableOpacity style={styles.button} onPress={doLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.containerLogin}>
      {showLogin ? renderLogin() : renderSignup()}
    </View>
  );
};

export default SignupLogin;
