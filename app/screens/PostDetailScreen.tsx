import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";

type PostDetailProps = {
  route: {
    params: {
      title: string;
      content: string;
    };
  };
};

export default function PostDetailScreen({ route }: PostDetailProps) {
  const { title, content } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { marginBottom: 12, fontSize: 24, fontWeight: "bold" },
  body: { fontSize: 16, lineHeight: 24 },
});
