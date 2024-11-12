export interface Favorites {
    [userId: string]: {
        [carId: string]: boolean;
    };
}