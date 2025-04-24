import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SFSymbol, SymbolView } from "expo-symbols";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: icon({ focused: "house.fill", default: "house" }),
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            tabBarIcon: icon({ focused: "camera.fill", default: "camera" }),
            tabBarLabel: "Camera",
          }}
        />
        <Tabs.Screen
          name="three"
          options={{
            tabBarIcon: icon({ focused: "person.fill", default: "person" }),
            tabBarLabel: "Settings",
          }}
        />
      </Tabs>
    </>
  );
}

const icon =
  (names: Record<"focused" | "default", SFSymbol>) =>
  (props: { focused: boolean; color: string; size: number }) =>
    (
      <SymbolView
        name={props.focused ? names.focused : names.default}
        type="hierarchical"
        size={props.size}
        tintColor={props.color}
      />
    );
