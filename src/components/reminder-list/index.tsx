import { useReminderStore } from "@/stores/reminder-store";

import * as SwiftUI from "@expo/ui/swift-ui-primitives";
import { TreeView } from "@modules/expo-tree-view";

export default function ReminderList() {
  const reminders = useReminderStore((s) => s.reminders);
  const groups = useReminderStore((s) => s.groups);

  // console.log("reminders", reminders);

  return (
    <SwiftUI.Host style={{ flex: 1 }}>
      <SwiftUI.VStack>
        <TreeView />
      </SwiftUI.VStack>
    </SwiftUI.Host>
  );
}
