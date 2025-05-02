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
    addGroup,
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
          createActions={[
            { id: "reminder", title: "Reminder", icon: "document.badge.plus" },
            { id: "group", title: "Group", icon: "folder.badge.plus" },
          ]}
          onCreate={(e) => {
            switch (e.nativeEvent.actionId) {
              case "reminder":
                addReminder("new reminder", e.nativeEvent.groupId);
                return;
              case "group":
                addGroup("new group", e.nativeEvent.groupId);
                return;
            }
          }}
          onDelete={(e) => {
            console.log("delete", e.nativeEvent);
            const { reminder, group } = findById(e.nativeEvent.id);

            if (reminder) deleteReminder(reminder.id);
            if (group) deleteGroup(group.id);
          }}
          onSelect={(e) => {
            console.log("select", e.nativeEvent);
            const { reminder, group } = findById(e.nativeEvent.id);
            console.log("selected", { reminder, group });
          }}
        />
      </SwiftUI.VStack>
    </SwiftUI.Host>
  );
}
