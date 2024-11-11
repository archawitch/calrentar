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
