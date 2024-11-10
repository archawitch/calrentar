import { Car } from "@appTypes/cars/carTypes";
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
}
