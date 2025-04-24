import { StyleSheet, Text, View } from "react-native";

import { ColorPicker } from "@expo/ui/swift-ui";
import { useState } from "react";

export default function Page() {
  const [color, setColor] = useState("");
  return (
    <View style={styles.container}>
      <Text>home page</Text>

      <ColorPicker
        selection={color}
        onValueChanged={setColor}
        style={{ width: 35, height: 35 }}
        supportsOpacity={false}
      />
      <Text>home page</Text>
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
