import React from "react";
import { Text, View, FlatList, Pressable, StyleSheet, Button } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* ---------- Données des cours ---------- */
const COURSES = [
  {
    id: "c1",
    title: "Intro to React Native",
    description: "Learn the basics of building native apps with React Native.",
  },
  {
    id: "c2",
    title: "Advanced JavaScript",
    description: "Deep dive into closures, prototypes, and async programming.",
  },
  {
    id: "c3",
    title: "UI/UX for Developers",
    description: "Design better and more user-friendly interfaces.",
  },
];

/* ---------- Écran : liste des cours ---------- */
function CourseListScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>All Courses</Text>

      <FlatList
        data={COURSES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={() =>
              navigation.navigate("CourseDetail", {
                courseId: item.id,
                title: item.title,
                description: item.description,
              })
            }
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

/* ---------- Écran : détails d’un cours ---------- */
function CourseDetailScreen({ route }: { route: any }) {
  const { title, description, courseId } = route.params;
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.body}>{description}</Text>
      <Text style={{ color: "gray", marginTop: 10 }}>Course ID: {courseId}</Text>
    </View>
  );
}

/* ---------- Écran : Wishlist ---------- */
function WishlistScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>My Wishlist</Text>
      <Text style={styles.body}>Your wishlist is empty.</Text>
    </View>
  );
}

/* ---------- Écran : Profil ---------- */
function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>My Profile</Text>
      <Text style={styles.body}>Name: Jane Student</Text>
      <Text style={styles.body}>Email: jane.student@example.com</Text>
    </View>
  );
}

/* ---------- Stack Navigator (All Courses) ---------- */
const Stack = createNativeStackNavigator();

function CoursesStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerLeft: () => (
          <Button
            title="☰"
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
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="AllCourses" component={CoursesStack} options={{ title: "All Courses" }} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ title: "My Wishlist" }} />
    </Tab.Navigator>
  );
}

/* ---------- Drawer principal ---------- */
const Drawer = createDrawerNavigator();

export default function Layout() {
  return (
    <Drawer.Navigator initialRouteName="Courses">
      <Drawer.Screen name="Courses" component={CoursesTabs} />
      <Drawer.Screen name="MyProfile" component={ProfileScreen} options={{ title: "My Profile" }} />
    </Drawer.Navigator>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  body: { fontSize: 16, color: "#222" },
  card: { backgroundColor: "#f0f0f0", padding: 12, borderRadius: 8, marginBottom: 10 },
  pressed: { opacity: 0.7 },
  cardTitle: { fontSize: 18, fontWeight: "600" },
  cardDesc: { fontSize: 14, color: "#555", marginTop: 4 },
});

