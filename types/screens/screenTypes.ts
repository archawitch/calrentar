export interface CarFilterType {
  searchInput: string;
  pickupDate: Date;
  priceRange: {
    minPice: number | undefined;
    maxPrice: number | undefined;
  };
  location: string[];
  makes: string[];
  models: string[];
  colors: string[];
}

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
