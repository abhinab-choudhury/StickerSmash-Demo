import { Pressable, View, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

type Props = {
  label: string;
  theme?: "primary";
  onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
  return theme === "primary" ? (
    <View
      style={[
        styles.buttonContainer,
        { borderWidth: 4, borderColor: "#ffd33f", borderRadius: 18 },
      ]}
    >
      <Pressable
        style={[styles.button, { backgroundColor: "#fff" }]}
        onPress={onPress}
      >
        <FontAwesome
          name="picture-o"
          size={18}
          color="#25292e"
          style={styles.buttonIcon}
        />
        <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: width * 0.8,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
