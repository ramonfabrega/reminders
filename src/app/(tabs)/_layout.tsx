import { Tabs } from "expo-router";

import { SFSymbol, SymbolView } from "expo-symbols";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: icon({
            active: "list.bullet",
            inactive: "list.bullet",
          }),
          title: "Tasks",
        }}
      />
      <Tabs.Screen
        name="recent"
        options={{
          tabBarIcon: icon({ active: "alarm.fill", inactive: "alarm" }),
          title: "Next",
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          tabBarIcon: icon({ active: "camera.fill", inactive: "camera" }),
          title: "Camera",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: icon({
            active: "gearshape.fill",
            inactive: "gearshape",
          }),
          title: "Settings",
        }}
      />
    </Tabs>
  );
}

const icon =
  (names: Record<"active" | "inactive", SFSymbol>) =>
  (props: { focused: boolean; color: string; size: number }) =>
    (
      <SymbolView
        name={props.focused ? names.active : names.inactive}
        type="hierarchical"
        size={props.size}
        tintColor={props.color}
      />
    );
