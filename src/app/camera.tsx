import { StyleSheet, Text, View } from "react-native";
import {
  useCameraDevice,
  useCameraDevices,
  useCameraPermission,
} from "react-native-vision-camera";

import { Button } from "@expo/ui/swift-ui";
import * as Linking from "expo-linking";

export default function Page() {
  const { hasPermission, requestPermission } = useCameraPermission();

  const devices = useCameraDevices();

  console.log("devices", devices);

  async function onPress() {
    const success = await requestPermission();
    if (!success) Linking.openSettings();
  }

  return (
    <View style={styles.container}>
      <Text>hasPermission: {hasPermission ? "true" : "false"}</Text>
      <Button onPress={onPress}>request perms</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
