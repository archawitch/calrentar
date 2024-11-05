import { View, Image, StyleSheet } from "react-native";

type ImageContainProp = {
  source: any;
};

const ImageContain = (props: ImageContainProp) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={props.source} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },
});

export default ImageContain;
