import { Stack } from "expo-router";
import useUpdatesListener from "@/hooks/use-updates-listener";
import { StatusBar } from "expo-status-bar";

import { Button } from "react-native";

export default function RootLayout() {
  useUpdatesListener();

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
