import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          height: 82,
          paddingTop: 8,
          paddingBottom: 10,

          backgroundColor: "#FFFFFF",

          borderTopWidth: 1,
          borderTopColor: "#EAE6DD",
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },

        tabBarActiveTintColor: "#6F8F57",
        tabBarInactiveTintColor: "#2D2D2D",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/home.png")}
              style={{
                tintColor: focused ? "#6F8F57" : "#2D2D2D",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: "캘린더",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/calendar.png")}
              style={{
                tintColor: focused ? "#6F8F57" : "#2D2D2D",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarLabel: () => null,

          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/add.png")}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="mission"
        options={{
          title: "미션",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/mission.png")}
              style={{
                tintColor: focused ? "#6F8F57" : "#2D2D2D",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="mypage"
        options={{
          title: "마이페이지",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/mypage.png")}
              style={{
                tintColor: focused ? "#6F8F57" : "#2D2D2D",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
