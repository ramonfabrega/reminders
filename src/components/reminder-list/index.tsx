import { useState } from "react";
import { View, Text, ActivityIndicator, TextInput } from "react-native";

import * as SwiftUI from "@expo/ui/swift-ui-primitives";
import { TreeView } from "@modules/expo-tree-view";

import { useReminderStore } from "@/stores/reminder-store";
import { Reminder } from "@/types";
import { buildTree } from "@/utils/tree";

export default function ReminderList() {
  const { reminders, groups, createRecord, deleteRecord } = useReminderStore();

  const nodes = buildTree(reminders, groups);

  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null
  );

  const isOpen = selectedReminder !== null;

  return (
    <>
      <SwiftUI.Host style={{ flex: 1 }}>
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
            const reminder = reminders.find((r) => r.id === e.nativeEvent.id);
            if (reminder) setSelectedReminder(reminder);
          }}
        />
      </SwiftUI.Host>

      <View>
        <SwiftUI.Host style={{ position: "absolute" }}>
          <SwiftUI.BottomSheet
            isOpened={isOpen}
            onIsOpenedChange={() => setSelectedReminder(null)}
          >
            <ReminderView reminder={selectedReminder} />
          </SwiftUI.BottomSheet>
        </SwiftUI.Host>
      </View>
    </>
  );
}

type ReminderViewProps = {
  reminder: Reminder | null;
};
function ReminderView({ reminder }: ReminderViewProps) {
  const [value, setValue] = useState("starting val");

  if (!reminder) return null;

  return (
    <SwiftUI.Host matchContents>
      <SwiftUI.VStack padding={20}>
        <SwiftUI.Button>hi</SwiftUI.Button>
        <SwiftUI.Text>lmao</SwiftUI.Text>
        <SwiftUI.TextInput defaultValue="Name" onChangeText={setValue} />
      </SwiftUI.VStack>
    </SwiftUI.Host>
  );
}
