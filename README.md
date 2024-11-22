
# Calrentar
A mobile application designed to facilitate the car rental process in Thailand, offering an efficient and reliable platform for users to rent vehicles with ease.

## Features
- **User Authentication**: Allows users to register and log in to access their rental details.
- **Car Search**: Enables users to search for available cars based on specific rental dates, ensuring convenience and flexibility.
- **Car Rental**: Facilitates the booking process by allowing users to rent a car using their name and driver’s license.
- **Rental History**: Provides users with an organized record of their past rentals for easy reference and management.

### [Additional Features]
- **Car Filtering**: Users can filter available cars based on various criteria, including price range, location, make, model, and color, ensuring the selection of a car that meets their preferences.
- **Favorites**: Users can save preferred cars for quick access and future bookings.
- **Pickup Location Selection**: Offers users the ability to choose from multiple pickup locations across Thailand for added convenience.

## Tech Stack
- React Native
- Expo
- Firebase

## How to use

### QR Code

You can scan the QR code below to run our application using Expo Go

![EAS QR code](/assets/eas_qr/eas_qr.png)

### Local

#### Firebase

1. Create "cars", "car_details", "locations" keys with empty value in your Realtime database

2. Import [cars](/assets/firebase/cars.json), [car_details](/assets/firebase/car_details.json), and [locations](/assets/firebase/locations.json) data into those corresponding keys in Realtime database

3. Create .env.local in the root directory and add your firebase configuration
```
.env.local
EXPO_PUBLIC_FIREBASE_API_KEY=""
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=""
EXPO_PUBLIC_FIREBASE_PROJECT_ID=""
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=""
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
EXPO_PUBLIC_FIREBASE_APP_ID=""
EXPO_PUBLIC_FIREBASE_DATABASE_URL=""
```

#### Application

1. Clone the repo
``` bash
git clone https://github.com/archawitch/calrentar.git
```

2. Install dependencies
``` bash
npm install
```

3. Start Expo
```bash
npx expo start
```

4. Run the app in Expo Go

## Contributor
- [archawitch](https://github.com/archawitch)
- [kittipattan](https://github.com/kittipattan)
- [totalnoobatthis](https://github.com/totalnoobatthis)

## Related Course
DES427 Mobile Application Programming, Sirindhorn International Institute of Technology (SIIT), Academic Year 2021
