export interface Car {
  id: number;
  make: string;
  model: string;
  color: string;
  rental_price: number;
  rent_count: number;
  rent_date: {
    [date: string]: boolean;
  };
  available_location: string[];
}

export interface CarDetail {
  id: number;
  make: string;
  model: string;
  color: string;
  rental_price: number;
  rent_count: number;
  rent_date: {
    [date: string]: boolean;
  };
  available_location: string[];
  horse_power: number;
  seats: number;
  transmission: string;
  year_produced: number;
}

export interface CarFilterType {
  searchInput: string;
  pickupDate: Date;
  priceRange: {
    minPrice: number | undefined;
    maxPrice: number | undefined;
  };
  location: string[];
  makes: string[];
  models: string[];
  colors: string[];
}

export type CarMake =
  | "Toyota"
  | "Honda"
  | "Chevrolet"
  | "BMW"
  | "Mercedes-Benz"
  | "Volkswagen"
  | "Hyundai"
  | "Kia"
  | "Mazda"
  | "Subaru"
  | "Acura"
  | "Volvo";
