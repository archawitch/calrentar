import { StyleSheet } from "react-native";

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 20,
    padding: 10,
  },
  searchArea: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#E5E4E3",
    borderRadius: 10,
    alignItems: "center",
  },
  searchButton: {
    // Add styles for the search button if needed
  },
  restaurantContainer: {
    padding: 5,
    margin: 10,
    backgroundColor: "#E5E4E3",
    width: 350,
    flex: 1,
  },
  restaurant: {
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
  },
  food_img: {
    width: 100,
    height: 100,
    margin: 3,
  },
  star_img: {
    width: 120,
    height: 30,
    margin: 3,
  },
  star_container: {
    padding: 5,
    margin: 5,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  group: {
    marginTop: 20,
  },
  center: {
    alignItems: "center",
  },
  signupText: {
    fontSize: 20,
    color: "blue",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 20,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 30,
  },
  input: {
    padding: 10,
    height: 40,
    borderWidth: 1,
  },
  containerLogin: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    padding: 20,
  },
});

export default styles;
