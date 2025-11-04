import React from "react";
import { Text, View, FlatList, Pressable, StyleSheet, Button, Image } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

/* ---------- Données des cours ---------- */
const COURSES = [
  {
    id: "c1",
    title: "⚛️ Intro to React Native",
    description: "Learn the basics of building native apps with React Native.",
  },
  {
    id: "c2",
    title: "💡 Advanced JavaScript",
    description: "Deep dive into closures, prototypes, and async programming.",
  },
  {
    id: "c3",
    title: "🎨 UI/UX for Developers",
    description: "Design better and more user-friendly interfaces.",
  },
];

/* ---------- Écran : liste des cours ---------- */
function CourseListScreen({ navigation }: { navigation: any }) {
  return (
    <LinearGradient colors={["#f6ecff", "#faf7ff", "#ffffff"]} style={styles.gradient}>
      <Text style={styles.heading}>📚 All Courses</Text>

      <FlatList
        data={COURSES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={() => {
              Toast.show({
                type: "success",
                text1: "Opening course",
                text2: item.title,
              });
              navigation.navigate("CourseDetail", {
                courseId: item.id,
                title: item.title,
                description: item.description,
              });
            }}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </Pressable>
        )}
      />
      <Toast />
    </LinearGradient>
  );
}

/* ---------- Écran : détails d’un cours ---------- */
function CourseDetailScreen({ route }: { route: any }) {
  const { title, description, courseId } = route.params;
  return (
    <LinearGradient colors={["#ffffff", "#f6ecff"]} style={styles.gradient}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.body}>{description}</Text>
      <Text style={{ color: "#777", marginTop: 10 }}>Course ID: {courseId}</Text>
    </LinearGradient>
  );
}

/* ---------- Écran : Wishlist ---------- */
function WishlistScreen() {
  return (
    <LinearGradient colors={["#fff0f6", "#ffffff"]} style={styles.gradient}>
      <Text style={styles.heading}>💖 My Wishlist</Text>
      <Text style={styles.body}>Your wishlist is empty for now...</Text>
    </LinearGradient>
  );
}

/* ---------- Écran : Profil ---------- */
function ProfileScreen() {
  return (
    <LinearGradient colors={["#f2e9ff", "#ffffff"]} style={styles.gradient}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=47" }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16 }}
        />
        <Text style={styles.heading}>👩‍💻 My Profile</Text>
        <Text style={styles.body}>Name: Firdaws El Yahiaoui </Text>
        <Text style={styles.body}>Email: f.elyahiaoui@students.ephec.be </Text>
      </View>
    </LinearGradient>
  );
}

/* ---------- Stack Navigator (All Courses) ---------- */
const Stack = createNativeStackNavigator();

function CoursesStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: "#e8d7ff" },
        headerTintColor: "#4b0082",
        headerTitleStyle: { fontWeight: "800", fontSize: 18 },
        headerLeft: () => (
          <Button
            title="☰"
            color="#4b0082"
            onPress={() => navigation.getParent()?.dispatch(DrawerActions.openDrawer())}
          />
        ),
      })}
    >
      <Stack.Screen name="CourseList" component={CourseListScreen} options={{ title: "Courses" }} />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={({ route }: any) => ({ title: route.params?.title || "Course Detail" })}
      />
    </Stack.Navigator>
  );
}

/* ---------- Tab Navigator (dans Courses) ---------- */
const Tab = createBottomTabNavigator();

function CoursesTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4b0082",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: { backgroundColor: "#f8f5ff", borderTopColor: "#ddd" },
      }}
    >
      <Tab.Screen
        name="AllCourses"
        component={CoursesStack}
        options={{
          title: "📘 All Courses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          title: "💖 Wishlist",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/* ---------- Drawer principal ---------- */
const Drawer = createDrawerNavigator();

export default function Layout() {
  return (
    <Drawer.Navigator
      initialRouteName="Courses"
      screenOptions={{
        drawerActiveTintColor: "#4b0082",
        drawerInactiveTintColor: "#333",
        drawerStyle: { backgroundColor: "#faf7ff" },
        headerStyle: { backgroundColor: "#f2e9ff" },
      }}
    >
      <Drawer.Screen name="Courses" component={CoursesTabs} options={{ title: "📚 Courses" }} />
      <Drawer.Screen name="MyProfile" component={ProfileScreen} options={{ title: "👩‍💻 Profile" }} />
    </Drawer.Navigator>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  gradient: { flex: 1, padding: 16 },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2d2d2d",
    marginBottom: 16,
    textAlign: "center",
  },
  body: { fontSize: 16, color: "#333", lineHeight: 22, textAlign: "center" },
  card: {
    backgroundColor: "#f8f0ff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e3d4ff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  pressed: { opacity: 0.85 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#4b0082" },
  cardDesc: { fontSize: 14, color: "#5c5c5c", marginTop: 4 },
});
