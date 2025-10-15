import React from "react";
import { StyleSheet, Pressable, FlatList, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../_layout";

type Props = NativeStackScreenProps<RootStackParamList, "PostList">;

const POSTS = [
  {
    id: "1",
    title: "React Native is Awesome",
    content:
      "React Native lets you build mobile apps using only JavaScript. Learn once, write anywhere! This is a fake post used for the exercise.",
  },
  {
    id: "2",
    title: "State Management Tips",
    content:
      "Managing state can be tricky. Use simple patterns first, then introduce libraries when needed. This is sample content for the exercise.",
  },
  {
    id: "3",
    title: "UI Design Principles",
    content:
      "Good UI is about clarity and consistency. Keep interfaces simple and predictable. More sample content here.",
  },
  {
    id: "4",
    title: "Optimizing Performance",
    content:
      "Profile first, then optimize. Use proper list virtualization and avoid unnecessary renders. This is dummy text.",
  },
];

export default function PostListScreen({ navigation }: Props) {
  function renderItem({ item }: { item: (typeof POSTS)[number] }) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.item,
          pressed && styles.itemPressed,
        ]}
        onPress={() =>
          navigation.navigate("PostDetail", {
            postId: item.id,
            title: item.title,
            content: item.content,
          })
        }
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  itemPressed: {
    opacity: 0.7,
  },
});
