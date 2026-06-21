import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../../src/components/common/AppHeader";

export default function TabLayout() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFDF7",
      }}
      edges={["top"]}
    >
      <AppHeader />

      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              height: 82,
              paddingTop: 6,
              paddingBottom: 8,
              backgroundColor: "#FFFFFF",
              borderTopWidth: 1,
              borderTopColor: "#EAE6DD",
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: "600",
            },
            tabBarActiveTintColor: "#587E47",
            tabBarInactiveTintColor: "#2D2D2D",
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "홈",
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require("../../assets/images/tabbar/home-active.png")
                      : require("../../assets/images/tabbar/home.png")
                  }
                  style={{ width: 17, height: 17 }}
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
                  source={
                    focused
                      ? require("../../assets/images/tabbar/calendar-active.png")
                      : require("../../assets/images/tabbar/calendar.png")
                  }
                  style={{ width: 17, height: 17 }}
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
                  source={require("../../assets/images/tabbar/add.png")}
                  style={{
                    width: 40,
                    height: 40,
                    marginTop: 9,
                  }}
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
                  source={
                    focused
                      ? require("../../assets/images/tabbar/mission-active.png")
                      : require("../../assets/images/tabbar/mission.png")
                  }
                  style={{ width: 17, height: 17 }}
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
                  source={require("../../assets/images/tabbar/mypage.png")}
                  style={{ width: 17, height: 17 }}
                  resizeMode="contain"
                />
              ),
            }}
          />
        </Tabs>
      </View>
    </SafeAreaView>
  );
}
