import { useState } from "react";
import { View } from "react-native";

import * as SwiftUI from "@expo/ui/swift-ui-primitives";
import { TreeView } from "@modules/expo-tree-view";

import { useTaskStore } from "@/stores/task-store";
import { Task } from "@/types";
import { buildTree } from "@/utils/tree";

export default function ReminderList() {
  const { tasks, groups, createRecord, deleteRecord } = useTaskStore();

  const nodes = buildTree(tasks, groups);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const isOpen = selectedTask !== null;

  return (
    <>
      <SwiftUI.Host style={{ flex: 1 }}>
        <TreeView
          title="Tasks"
          nodes={nodes}
          createActions={[
            { id: "tasks", title: "Task", icon: "document.badge.plus" },
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
            const task = tasks.find((r) => r.id === e.nativeEvent.id);
            if (task) setSelectedTask(task);
          }}
        />
      </SwiftUI.Host>

      <View>
        <SwiftUI.Host style={{ position: "absolute" }}>
          <SwiftUI.BottomSheet
            isOpened={isOpen}
            onIsOpenedChange={() => setSelectedTask(null)}
          >
            <TaskView task={selectedTask} />
          </SwiftUI.BottomSheet>
        </SwiftUI.Host>
      </View>
    </>
  );
}

type TaskViewProps = {
  task: Task | null;
};
function TaskView({ task }: TaskViewProps) {
  const [_, setValue] = useState("starting val");

  if (!task) return null;

  return (
    <SwiftUI.Host matchContents>
      <SwiftUI.VStack padding={20}>
        <SwiftUI.Button>hi</SwiftUI.Button>
        <SwiftUI.Text>lmao</SwiftUI.Text>
        <SwiftUI.TextInput placeholder="Name" onChangeText={setValue} />
      </SwiftUI.VStack>
    </SwiftUI.Host>
  );
}
