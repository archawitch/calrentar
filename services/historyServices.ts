import {
  ref,
  get
} from "firebase/database";
import { auth, database } from "@configs/firebaseConfig";

import { History, HistoryItem, HistoryToStore } from "@appTypes/history/historyTypes";

export const getHistoryList = async (): Promise<HistoryItem[] | void> => {
  const historyListRef = ref(
    database,
    `user_rent_info/${auth.currentUser?.uid}`
  );
  try {
    const snapshot = await get(historyListRef);

    if (!snapshot.exists()) {
      console.log("No data available");
      return;
    }

    const data = snapshot.val();
    const historyList: HistoryItem[] = Object.entries<{
      car_id: number;
      make: string;
      model: string;
      pickup_date: string;
      return_date: string;
      price_paid: number;
    }>(data).map(([historyId, historyData]) => ({
      id: historyId,
      ...historyData,
      pickup_date: new Date(historyData.pickup_date),
      return_date: new Date(historyData.return_date),
    }));

    return historyList;

  } catch (error: any) {
    console.log(error);
    return;
  }
};

export const getHistoryDetail = async (rent_id: string) => {
  const historyDetailRef = ref(
    database,
    `rent_info/${rent_id}`
  );
  try {
    const snapshot = await get(historyDetailRef);

    if (!snapshot.exists()) {
      console.log("No data available");
      return;
    }

    const data = snapshot.val();
    const historyDetail: History = {
      ...data,
      pickup_date: new Date(data.pickup_date),
      return_date: new Date(data.return_date)
    };
    console.log(historyDetail);

    return historyDetail;

  } catch (error: any) {
    console.log(error);
    return;
  }
};
