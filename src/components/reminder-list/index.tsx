import { useReminderStore } from "@/stores/reminder-store";

import { StyleSheet, useWindowDimensions, View, Text } from "react-native";
import * as SwiftUI from "@expo/ui/swift-ui";

import { SampleButton } from "@/../modules/expo-tree-view";

export default function ReminderList() {
  const reminders = useReminderStore((s) => s.reminders);
  const groups = useReminderStore((s) => s.groups);

  // console.log("reminders", reminders);

  const { width } = useWindowDimensions();

  // console.log({ pi: Foo.PI });

  // return (
  //   <SampleButton
  //     title="hi"

  //     // onPress={() => console.log("pressed")}
  //   />
  // );

  return (
    <SwiftUI.Host style={{ flex: 1 }}>
      <SampleButton
        title="foo"
        // onPress={() => console.log("pressed")}
      />
    </SwiftUI.Host>
  );

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
