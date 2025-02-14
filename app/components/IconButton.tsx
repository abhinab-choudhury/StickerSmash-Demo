import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
};

export default function IconButton({ icon, label, onPress }: Props) {
  return (
    <Pressable style={styles.iconBtn} onPress={onPress}>
      <MaterialIcons name={icon} size={38} color="#fff" />
      <Text style={styles.iconBtnLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconBtnLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
