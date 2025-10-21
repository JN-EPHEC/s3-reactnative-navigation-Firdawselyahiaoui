import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

////////////////////////////////////////////////////////
// --- 1️⃣ Écrans de l'app (écrits directement ici) ---
////////////////////////////////////////////////////////

// Liste des produits
function ProductListScreen({ navigation }: any) {
  const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Mouse" },
    { id: 3, name: "Keyboard" },
  ];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Product List
      </Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductDetail", { product: item })}
            style={{
              backgroundColor: "#eee",
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Détail du produit
function ProductDetailScreen({ route }: any) {
  const { product } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{product.name}</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>
        Details about {product.name}...
      </Text>
    </View>
  );
}

// Écran du panier
function CartScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Your Shopping Cart is empty.</Text>
    </View>
  );
}

////////////////////////////////////////////////////////
// --- 2️⃣ Création du Stack pour l'onglet "Shop" ---
////////////////////////////////////////////////////////

const Stack = createStackNavigator();

function ShopStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "Shop" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product Details" }}
      />
    </Stack.Navigator>
  );
}

////////////////////////////////////////////////////////
// --- 3️⃣ Création du Bottom Tab principal ---
////////////////////////////////////////////////////////

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator
      initialRouteName="Shop"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Shop" component={ShopStack} />
      <Tab.Screen name="My Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}
