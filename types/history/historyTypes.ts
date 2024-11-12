import { PickupType } from "@appTypes/screens/screenTypes";

export interface History {
  car_id: number;
  make: string;
  model: string;
  year_produced: number;
  color: string;
  price_paid: number;
  pickup_date: Date;
  return_date: Date;
  pickup_type: PickupType;
  pickup_location: string;
  renter_name: string;
  driver_license_no: string;
}

export type HistoryToStore = Omit<History, "pickup_date" | "return_date"> & {
  pickup_date: string;
  return_date: string;
  user_id: string;
};

export interface HistoryItem {
  id: string;
  car_id: number;
  make: string;
  model: string;
  pickup_date: Date;
  return_date: Date;
  price_paid: number;
}
