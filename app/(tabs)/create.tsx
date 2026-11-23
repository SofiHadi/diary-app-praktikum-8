import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { addDiary } from "../../src/features/diary/diarySlice";
import { useAppDispatch } from "../../src/store/hooks";
import { COLORS, RADIUS, SPACE } from "../../src/styles/tokens";

const MOOD_OPTIONS = ["🌤️", "💻", "📖", "😊", "😔", "🔥"];

export default function CreateScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("🌤️");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (trimmedTitle.length < 3) {
      setError("Judul diary minimal 3 karakter.");
      Alert.alert("Validasi Gagal", "Judul diary minimal 3 karakter.");
      return;
    }

    if (!trimmedBody) {
      setError("Isi diary tidak boleh kosong.");
      Alert.alert("Validasi Gagal", "Isi diary tidak boleh kosong.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const preview =
      trimmedBody.length > 80 ? `${trimmedBody.slice(0, 80)}...` : trimmedBody;

    dispatch(
      addDiary({
        title: trimmedTitle,
        date: today,
        preview,
        body: trimmedBody,
        mood,
      }),
    );

    setTitle("");
    setBody("");
    setMood("🌤️");
    setError("");
    router.replace("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Pilih Mood</Text>
      <View style={styles.moodRow}>
        {MOOD_OPTIONS.map((item) => {
          const active = mood === item;
          return (
            <Pressable
              key={item}
              onPress={() => setMood(item)}
              style={[styles.moodItem, active && styles.moodItemActive]}
            >
              <Text style={styles.moodText}>{item}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Judul Diary</Text>
      <TextInput
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          if (text.trim().length >= 3) setError("");
        }}
        placeholder="Minimal 3 karakter..."
        style={styles.input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Isi Catatan</Text>
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ceritakan harimu..."
        multiline
        textAlignVertical="top"
        style={[styles.input, styles.textArea]}
      />

      <Pressable onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Simpan Diary</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
    gap: SPACE.m,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  moodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  moodItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },
  moodItemActive: {
    borderColor: COLORS.accent,
    backgroundColor: "#E0F2FE",
  },
  moodText: {
    fontSize: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: RADIUS.card,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: COLORS.text,
  },
  textArea: {
    minHeight: 140,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: "500",
  },
  submitButton: {
    padding: 14,
    alignItems: "center",
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
