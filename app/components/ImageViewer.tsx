import { Image } from "expo-image";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

type Props = {
  imgSource: string;
  seletedImage?: string;
};

export default function ImageViewer({ imgSource, seletedImage }: Props) {
  const imgSrc = seletedImage ? { uri: seletedImage } : imgSource;

  return <Image source={imgSrc} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.8,
    height: height * 0.55,
    borderRadius: 18,
  },
});
