import "react-native-reanimated";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostListScreen from "./screens/PostListScreen";
import PostDetailScreen from "./screens/PostDetailScreen";

export type RootStackParamList = {
  PostList: undefined;
  PostDetail: { postId: string; title: string; content: string };
};

export default function RootLayout() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
  
      <Stack.Navigator initialRouteName="PostList">
        <Stack.Screen
          name="PostList"
          component={PostListScreen}
          options={{ title: "Blog Posts" }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{ title: "Post Details" }}
        />
      </Stack.Navigator>
  
  );
}

