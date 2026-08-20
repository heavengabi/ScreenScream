import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Profile from "./Screens/Profile";
import Home from "./Screens/Home";
import Favorite from "./Screens/Favorite";
import Details from "./Screens/Details";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detalhes"
        component={Details}
        options={{
          headerTitle: "Detalhes do Filme",
          headerStyle: { backgroundColor: "#2b2929" },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#ff0000ff",
            tabBarInactiveTintColor: "#888888",
            tabBarStyle: {
              backgroundColor: "black",
              borderTopColor: "#222",
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />

          <Tab.Screen
            name="Favorite"
            component={Favorite}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart-outline" size={size} color={color} />
              ),
            }}
          />

          <Tab.Screen
            name="Perfil"
            component={Profile}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
