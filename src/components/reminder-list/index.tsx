import { useReminderStore } from "@/stores/reminder-store";
import { buildTree } from "@/utils/tree";

import * as SwiftUI from "@expo/ui/swift-ui-primitives";

import { TreeView } from "@modules/expo-tree-view";

export default function ReminderList() {
  const { reminders, groups, createRecord, deleteRecord } = useReminderStore();

  const nodes = buildTree(reminders, groups);

  return (
    <SwiftUI.Host style={{ flex: 1 }}>
      <SwiftUI.VStack>
        <TreeView
          title="Reminders"
          nodes={nodes}
          createActions={[
            { id: "reminders", title: "Reminder", icon: "document.badge.plus" },
            { id: "groups", title: "Group", icon: "folder.badge.plus" },
          ]}
          onCreate={(e) => {
            createRecord(
              e.nativeEvent.actionId,
              "new-item",
              e.nativeEvent.groupId
            );
          }}
          onDelete={(e) => {
            deleteRecord(e.nativeEvent.id);
          }}
          onSelect={(e) => {
            console.log("select", e.nativeEvent);
          }}
        />
      </SwiftUI.VStack>
    </SwiftUI.Host>
  );
}
