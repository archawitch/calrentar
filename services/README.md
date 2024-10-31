# services

handle like a backend

- business logic like validators, search
- firebase database like login, register, add rent information

These two should work together so that there is no business logic in any components or screens.

For example, when the user clicks 'search', it should return a list of cars and their details according to the sending information (like car name, price range, etc.)

- home -> search, popular cars
- filter -> when select brands -> return models -> select models -> return colors
- car details -> car details

Also, services should provide functions like getCarImage(), etc.

don't need to init firebase, just use it from /config
