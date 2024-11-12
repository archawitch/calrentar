export type PickupType = "Self-pickup" | "Delivery service";

export interface RentFormType {
  pickupDate: Date;
  returnDate: Date;
  pickupType: PickupType;
  pickupLocation: string;
  name: string;
  driverLicense: string;
}

export interface ProfileForm {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ListDetailsType {
  title: string;
  details: string;
}

export interface CarFilterType {
  searchInput: string;
  pickupDate: Date;
  priceRange: {
    minPrice: number;
    maxPrice: number;
  };
  location: string[];
  makes: string[];
  models: string[];
  colors: string[];
}
