// Navigation.tsx
import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
import CarDetailsScreen from "@screens/main/home/CarDetailsScreen";
import RentFormScreen from "@screens/main/home/RentFormScreen";
import RentConfirmationScreen from "@screens/main/home/RentConfirmationScreen";
import HistoryScreen from "@screens/main/history/HistoryScreen";
import HistoryDetailsScreen from "@screens/main/history/HistoryDetailsScreen";
import SavedScreen from "@screens/main/saved/SavedScreen";
import ProfileScreen from "@screens/main/profile/ProfileScreen";

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
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="CarDetails"
        component={CarDetailsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="RentForm"
        component={RentFormScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="RentConfirmation"
        component={RentConfirmationScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

// History Stack
function HistoryNavigator() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <HistoryStack.Screen
        name="HistoryDetails"
        component={HistoryDetailsScreen}
        options={{ headerShown: false }}
      />
    </HistoryStack.Navigator>
  );
}

// Main Tab Navigator
function MainNavigator() {
  return (
    <MainTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarLabel: ({ color }) => {
          let tabName: string = "";
          if (route.name === "HomeTab") {
            tabName = "Home";
          } else if (route.name === "HistoryTab") {
            tabName = "History";
          } else if (route.name === "SavedTab") {
            tabName = "Saved";
          } else if (route.name === "ProfileTab") {
            tabName = "Profile";
          }

          return <Text style={{ color: color }}>{tabName}</Text>;
        },
        tabBarIcon: ({ size, color }) => {
          let iconName: any;
          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "HistoryTab") {
            iconName = "history";
          } else if (route.name === "SavedTab") {
            iconName = "bookmark";
          } else if (route.name === "ProfileTab") {
            iconName = "account-circle";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2B2930",
        tabBarInactiveTintColor: "#A1A1A6",
        tabBarStyle: {
          paddingTop: 5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: "white",
          position: "absolute",
          height: 55,
        },
        tabBarLabelStyle: { paddingBottom: 2 },
      })}>
      <MainTab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="HistoryTab"
        component={HistoryNavigator}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="SavedTab"
        component={SavedScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="ProfileTab"
        component={ProfileScreen}
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
