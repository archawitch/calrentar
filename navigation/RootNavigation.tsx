// Navigation.tsx
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { User } from "firebase/auth";
import { auth } from "@configs/firebaseConfig";
import LandingScreen from "@screens/landing/LandingScreen";

const AuthStack = createStackNavigator<AuthStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const HistoryStack = createStackNavigator<HistoryStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

// Auth Stack
const AuthNavigator: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <LoginScreen {...props} onLogin={onLogin} />}
      </AuthStack.Screen>
      <AuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

// Home Stack
const HomeNavigator = () => {
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
};

// History Stack
const HistoryNavigator = () => {
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
};

// Main Tab Navigator
const MainNavigator: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
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
          backgroundColor: "white",
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
      <MainTab.Screen name="ProfileTab" options={{ headerShown: false }}>
        {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
      </MainTab.Screen>
    </MainTab.Navigator>
  );
};

// Root Navigation
const RootNavigation: React.FC = () => {
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log("Error retrieving user from AsyncStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkLanding = async () => {
    try {
      const landing = await AsyncStorage.getItem("isFirstTime");
      if (landing) {
        const parsedLanding = landing === "true";
        setIsFirstTime(parsedLanding);
      }
    } catch (error) {
      console.log("Error retrieving landing from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    const checkApp = async () => {
      await checkLanding();
      await checkUser();
    };
    checkApp();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isFirstTime) {
    return (
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Landing" options={{ headerShown: false }}>
            {(props) => (
              <LandingScreen
                {...props}
                onContinue={() => {
                  setIsFirstTime(false);
                }}
              />
            )}
          </RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <RootStack.Navigator>
          {user ? (
            <RootStack.Screen name="Main" options={{ headerShown: false }}>
              {(props) => (
                <MainNavigator
                  {...props}
                  onLogout={() => {
                    setUser(null);
                  }}
                />
              )}
            </RootStack.Screen>
          ) : (
            <RootStack.Screen name="Auth" options={{ headerShown: false }}>
              {(props) => (
                <AuthNavigator
                  {...props}
                  onLogin={() => {
                    const setLanding = async () => {
                      await AsyncStorage.setItem(
                        "isFirstTime",
                        JSON.stringify("false")
                      );
                    };
                    setLanding();
                    setUser(auth.currentUser);
                  }}
                />
              )}
            </RootStack.Screen>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height,
    backgroundColor: "white",
  },
});

export default RootNavigation;
