import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
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
                  source={require("../../assets/images/home.png")}
                  style={{
                    tintColor: focused ? "#587E47" : "#2D2D2D",
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
                    tintColor: focused ? "#587E47" : "#2D2D2D",
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
                <View
                  style={{
                    width: 43,
                    height: 42,
                    borderRadius: 28,
                    backgroundColor: "#587E47",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.12,
                    shadowRadius: 4,
                    elevation: 4,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "PretendardSemiBold",
                      fontSize: 42,
                      lineHeight: 42,
                      color: "#FFFFFF",
                    }}
                  >
                    +
                  </Text>
                </View>
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
                    tintColor: focused ? "#587E47" : "#2D2D2D",
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
                    tintColor: focused ? "#587E47" : "#2D2D2D",
                  }}
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
