import { View, Image, StyleSheet } from "react-native";

type ImageContainProp = {
  source: any;
};

const ImageContain = (props: ImageContainProp) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={props.source} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  image: {
    height: 150,
    width: "100%",
  },
});

export default ImageContain;
