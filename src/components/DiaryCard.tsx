import { Pressable, StyleSheet, Text, View } from "react-native";
import { DiaryEntry } from "../features/diary/diarySlice";
import { COLORS, RADIUS, SPACE } from "../styles/tokens";

type Props = {
  entry: DiaryEntry;
  onPress: () => void;
};

export default function DiaryCard({ entry, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.mood}>{entry.mood}</Text>
        <View style={styles.headerText}>
          <Text style={styles.title}>{entry.title}</Text>
          <Text style={styles.date}>{entry.date}</Text>
        </View>
        {entry.liked ? <Text style={styles.badge}>❤️</Text> : null}
      </View>
      <Text style={styles.preview} numberOfLines={2}>
        {entry.preview}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mood: {
    fontSize: 32,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },
  date: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  badge: {
    fontSize: 18,
  },
  preview: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 20,
  },
});
