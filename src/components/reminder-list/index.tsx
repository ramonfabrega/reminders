import { useReminderStore } from "@/stores/reminder-store";
import { buildTree } from "@/utils/tree";

import * as SwiftUI from "@expo/ui/swift-ui-primitives";

import { TreeView } from "@modules/expo-tree-view";

export default function ReminderList() {
  const {
    reminders,
    groups,
    addReminder,
    deleteReminder,
    deleteGroup,
    findById,
  } = useReminderStore();

  const nodes = buildTree(reminders, groups);

  return (
    <SwiftUI.Host style={{ flex: 1 }}>
      <SwiftUI.VStack>
        <TreeView
          title="Reminders"
          nodes={nodes}
          onCreate={(e) => {
            addReminder("new reminder", e.nativeEvent.groupId);
          }}
          onDelete={(e) => {
            const { reminder, group } = findById(e.nativeEvent.id);

            if (reminder) deleteReminder(reminder.id);
            if (group) deleteGroup(group.id);
          }}
          onSelect={(e) => {
            const { reminder, group } = findById(e.nativeEvent.id);
            console.log("selected", { reminder, group });
          }}
        />
      </SwiftUI.VStack>
    </SwiftUI.Host>
  );
}
