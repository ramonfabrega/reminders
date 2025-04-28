import { useReminderStore } from "@/stores/reminder-store";

import {
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  Button,
} from "react-native";
import * as SwiftUI from "@expo/ui/swift-ui";

export default function ReminderList() {
  const reminders = useReminderStore((s) => s.reminders);
  const groups = useReminderStore((s) => s.groups);

  console.log("reminders", reminders);

  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <SwiftUI.List style={{ width }} moveEnabled editModeEnabled>
        <SwiftUI.Label title="foo" />
        <SwiftUI.Label title="bar" />
        <View>
          <Text>foot</Text>
          <Text>foot</Text>
        </View>
        <Text>
          moo
          <Text>zoo</Text>
        </Text>
      </SwiftUI.List>
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
