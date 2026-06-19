import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../../src/components/common/AppHeader";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFDF7" }}>
      <AppHeader />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#749364",
          tabBarInactiveTintColor: "#999999",
        }}
        safeAreaInsets={{
          top: 0,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "홈",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="calendar"
          options={{
            title: "캘린더",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="add"
          options={{
            title: "",
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="mission"
          options={{
            title: "미션",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="flag" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="mypage"
          options={{
            title: "마이",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
