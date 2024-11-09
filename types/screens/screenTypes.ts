export interface RentFormType {
  pickupDate: Date;
  returnDate: Date;
  pickupType: "Self-pickup" | "Delivery service";
  pickupLocation: string;
  name: string;
  driverLicense: string;
}

export interface ListDetailsType {
  title: string;
  details: string;
}
