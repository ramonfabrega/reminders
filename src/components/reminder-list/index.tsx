import { useReminderStore } from "@/stores/reminder-store";
import { buildTree } from "@/utils/tree";

import * as SwiftUI from "@expo/ui/swift-ui-primitives";
import { TreeView } from "@modules/expo-tree-view";

export default function ReminderList() {
  const reminders = useReminderStore((s) => s.reminders);
  const groups = useReminderStore((s) => s.groups);

  const addReminder = useReminderStore((s) => s.addReminder);

  const nodes = buildTree(reminders, groups);

  console.log(JSON.stringify(reminders, null, 2));

  return (
    <SwiftUI.Host style={{ flex: 1 }}>
      <SwiftUI.VStack>
        <TreeView
          title="Reminders"
          nodes={nodes}
          onNewPress={() => addReminder("New Reminder")}
        />
      </SwiftUI.VStack>
    </SwiftUI.Host>
  );
}
