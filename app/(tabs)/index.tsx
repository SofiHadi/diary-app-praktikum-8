import { useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DiaryCard from "../../src/components/DiaryCard";
import { setMoodFilter } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { COLORS, RADIUS, SPACE } from "../../src/styles/tokens";

const MOOD_FILTERS = ["all", "🌤️", "💻", "📖", "😊", "😔", "🔥"];

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const entries = useAppSelector((state) => state.diary.entries);
  const moodFilter = useAppSelector((state) => state.diary.moodFilter);

  const totalDiary = entries.length;
  const totalFavorite = entries.filter((item) => item.liked).length;

  const filteredEntries =
    moodFilter === "all"
      ? entries
      : entries.filter((item) => item.mood === moodFilter);

  return (
    <View style={styles.screen}>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalDiary}</Text>
          <Text style={styles.statLabel}>Total Diary</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalFavorite}</Text>
          <Text style={styles.statLabel}>Total Favorite</Text>
        </View>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {MOOD_FILTERS.map((mood) => {
            const active = moodFilter === mood;
            return (
              <Pressable
                key={mood}
                onPress={() => dispatch(setMoodFilter(mood))}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text
                  style={[styles.chipText, active && styles.chipTextActive]}
                >
                  {mood === "all" ? "Semua Mood" : mood}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={
          filteredEntries.length === 0 ? styles.emptyContainer : styles.list
        }
        renderItem={({ item }) => (
          <DiaryCard
            entry={item}
            onPress={() => router.push(`/detail/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          entries.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyEmoji}>📓</Text>
              <Text style={styles.emptyTitle}>Belum Ada Catatan Diary</Text>
              <Text style={styles.emptyDesc}>
                Mulai tulis cerita atau aktivitas harianmu sekarang melalui tab
                Tambah.
              </Text>
              <Pressable
                onPress={() => router.push("/create")}
                style={styles.emptyButton}
              >
                <Text style={styles.emptyButtonText}>Tulis Diary Pertama</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>
                Tidak Ada Diary dengan Mood Ini
              </Text>
              <Text style={styles.emptyDesc}>
                Belum ada catatan yang sesuai dengan filter mood pilihanmu.
              </Text>
              <Pressable
                onPress={() => dispatch(setMoodFilter("all"))}
                style={styles.emptyButton}
              >
                <Text style={styles.emptyButtonText}>Tampilkan Semua</Text>
              </Pressable>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: SPACE.m,
    gap: SPACE.m,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  filterRow: {
    gap: 8,
    paddingVertical: 2,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },
  chipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyBox: {
    alignItems: "center",
    padding: SPACE.l,
    backgroundColor: "#FFFFFF",
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 44,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 20,
  },
  emptyButton: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
