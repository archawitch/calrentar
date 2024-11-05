// Navigation.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  RootStackParamList,
  AuthStackParamList,
  MainTabParamList,
  HomeStackParamList,
  HistoryStackParamList,
} from "@appTypes/navigation/navigationTypes";

import LoginScreen from "@screens/auth/LoginScreen";
import SignupScreen from "@screens/auth/SignupScreen";
import HomeScreen from "@screens/main/home/HomeScreen";
// import CarInformationScreen from "../screens/Main/Home/CarInformationScreen";
// import RentInformationScreen from "../screens/Main/Home/RentInformationScreen";
// import RentConfirmationScreen from "../screens/Main/Home/RentConfirmationScreen";
// import HistoryScreen from "../screens/Main/History/HistoryScreen";
// import RentHistoryDetails from "../screens/Main/History/RentHistoryDetails";
// import SavedCarsScreen from "../screens/Main/SavedCarsScreen";
// import ProfileScreen from "../screens/Main/ProfileScreen";

const AuthStack = createStackNavigator<AuthStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const HistoryStack = createStackNavigator<HistoryStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

// Auth Stack
function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}

// Home Stack
function HomeNavigator() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="CarInformation"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="RentInformation"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="RentConfirmation"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

// History Stack
function HistoryNavigator() {
  return (
    <HistoryStack.Navigator initialRouteName="History">
      <HistoryStack.Screen
        name="History"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <HistoryStack.Screen
        name="RentHistoryDetails"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </HistoryStack.Navigator>
  );
}

// Main Tab Navigator
function MainNavigator() {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="HistoryTab"
        component={HistoryNavigator}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="SavedTab"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="ProfileTab"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </MainTab.Navigator>
  );
}

// Root Navigation
const RootNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Main"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
