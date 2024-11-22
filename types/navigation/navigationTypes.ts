import {
  NavigatorScreenParams,
  RouteProp,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Car, CarDetail } from "@appTypes/cars/carTypes";
import { RentFormType } from "@appTypes/screens/screenTypes";
import { History, HistoryItem } from "@appTypes/history/historyTypes";

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  CarDetails: {
    carData: Car;
    pickupDate: Date;
  };
  RentForm: {
    carData: CarDetail;
    pickupDate: Date;
  };
  RentConfirmation: {
    carData: CarDetail;
    rentForm: RentFormType;
  };
};

export type HistoryStackParamList = {
  History: undefined;
  HistoryDetails: {
    history: HistoryItem;
  };
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  HistoryTab: NavigatorScreenParams<HistoryStackParamList>;
  SavedTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export interface LoginScreenNavigationProp {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthStackParamList, "Login">,
    StackNavigationProp<RootStackParamList>
  >;
  onLogin: () => void;
}

export interface SignupScreenNavigationProp {
  navigation: StackNavigationProp<AuthStackParamList, "Signup">;
}

export interface HomeScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList, "Home">,
    StackNavigationProp<RootStackParamList>
  >;
}

export interface CarDetailsScreenProps {
  route: RouteProp<HomeStackParamList, "CarDetails">;
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList, "CarDetails">,
    StackNavigationProp<RootStackParamList>
  >;
}

export interface RentFormScreenProps {
  route: RouteProp<HomeStackParamList, "RentForm">;
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList, "RentForm">,
    StackNavigationProp<RootStackParamList>
  >;
}

export interface RentConfirmationScreenProps {
  route: RouteProp<HomeStackParamList, "RentConfirmation">;
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList, "RentConfirmation">,
    StackNavigationProp<RootStackParamList>
  >;
}

export interface HistoryScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<HistoryStackParamList, "History">,
    StackNavigationProp<RootStackParamList>
  >;
}

export interface HistoryDetailsScreenProps {
  route: RouteProp<HistoryStackParamList, "HistoryDetails">;
  navigation: CompositeNavigationProp<
    StackNavigationProp<HistoryStackParamList, "HistoryDetails">,
    StackNavigationProp<RootStackParamList>
  >;
}

export interface SavedScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export interface ProfileScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
  onLogout: () => void;
}
