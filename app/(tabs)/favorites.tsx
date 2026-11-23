import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DiaryCard from "../../src/components/DiaryCard";
import { clearAllFavorites } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { COLORS, RADIUS, SPACE } from "../../src/styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const favoriteEntries = useAppSelector((state) =>
    state.diary.entries.filter((item) => item.liked),
  );

  const handleClearFavorites = () => {
    Alert.alert(
      "Hapus Semua Favorite",
      "Semua tanda favorite pada diary akan dihapus.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus Semua",
          style: "destructive",
          onPress: () => dispatch(clearAllFavorites()),
        },
      ],
    );
  };

  return (
    <View style={styles.screen}>
      {favoriteEntries.length > 0 ? (
        <View style={styles.headerRow}>
          <Text style={styles.countText}>
            {favoriteEntries.length} Diary Favorite
          </Text>
          <Pressable onPress={handleClearFavorites} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Hapus Semua Favorite</Text>
          </Pressable>
        </View>
      ) : null}

      <FlatList
        data={favoriteEntries}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={
          favoriteEntries.length === 0 ? styles.emptyContainer : styles.list
        }
        renderItem={({ item }) => (
          <DiaryCard
            entry={item}
            onPress={() => router.push(`/detail/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>🤍</Text>
            <Text style={styles.emptyTitle}>Belum Ada Diary Favorite</Text>
            <Text style={styles.emptyDesc}>
              Tandai catatan diary favoritmu dengan menekan tombol Tambah ke
              Favorite pada halaman detail agar muncul di sini.
            </Text>
            <Pressable
              onPress={() => router.push("/")}
              style={styles.emptyButton}
            >
              <Text style={styles.emptyButtonText}>Lihat Semua Diary</Text>
            </Pressable>
          </View>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.danger,
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
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
