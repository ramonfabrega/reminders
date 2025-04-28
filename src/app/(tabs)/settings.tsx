import { StyleSheet, Text, View } from "react-native";

import * as Updates from "expo-updates";
import * as Application from "expo-application";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text>
        {channel()} {version()}
      </Text>
    </View>
  );
}

function channel() {
  return Updates.channel || "dev";
}

function date() {
  Updates.createdAt?.toLocaleDateString();
}

function version() {
  return `${Application.nativeApplicationVersion} (${Application.nativeBuildVersion})`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
