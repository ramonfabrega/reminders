import { useReminderStore } from "@/stores/reminder-store";
import { buildTree } from "@/utils/tree";

import * as SwiftUI from "@expo/ui/swift-ui-primitives";
import { TreeView } from "@modules/expo-tree-view";

export default function ReminderList() {
  const { reminders, groups, addReminder, deleteReminder } = useReminderStore();

  console.log(JSON.stringify(reminders, null, 2));

  return (
    <SwiftUI.Host style={{ flex: 1 }}>
      <SwiftUI.VStack>
        <TreeView
          title="Reminders"
          nodes={buildTree(reminders, groups)}
          onCreate={() => {
            addReminder("New Reminder");
          }}
          onDelete={(e) => {
            console.log("deleting", e.nativeEvent.id);
            deleteReminder(e.nativeEvent.id);
          }}
          onSelect={(e) => {
            console.log("selected", e.nativeEvent.id);
          }}
        />
      </SwiftUI.VStack>
    </SwiftUI.Host>
  );
}
