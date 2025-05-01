import { useReminderStore } from "@/stores/reminder-store";
import { newNode } from "@/utils/factory";

import * as SwiftUI from "@expo/ui/swift-ui-primitives";
import { TreeView, TreeViewNode } from "@modules/expo-tree-view";
import { useState } from "react";

export default function ReminderList() {
  const reminders = useReminderStore((s) => s.reminders);
  const groups = useReminderStore((s) => s.groups);

  // console.log("reminders", reminders);

  const { nodes, addNode, removeNode } = useNodes();

  return (
    <SwiftUI.Host style={{ flex: 1 }}>
      <SwiftUI.VStack>
        <TreeView title="Reminders" nodes={nodes} />

        <SwiftUI.Button onPress={addNode}>add</SwiftUI.Button>
        <SwiftUI.Button onPress={removeNode}>delete</SwiftUI.Button>
      </SwiftUI.VStack>
    </SwiftUI.Host>
  );
}

function useNodes() {
  const [nodes, setNodes] = useState<TreeViewNode[]>([
    newNode({ name: "users", children: null }),
    newNode({
      name: "documents",
      children: [
        newNode({ name: "doc-1", children: null }),
        newNode({ name: "doc-2", children: null }),
      ],
    }),
    newNode({ name: "documents-empty", children: [] }),
  ]);

  function addNode() {
    setNodes((prev) => [
      ...prev,
      newNode({ name: `doc-${prev.length + 1}`, children: null }),
    ]);
  }

  function removeNode() {
    setNodes((prev) => prev.slice(0, -1));
  }

  function clearNodes() {
    setNodes([]);
  }

  return {
    nodes,
    addNode,
    removeNode,
    clearNodes,
  };
}
