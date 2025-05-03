import { randomUUID } from "expo-crypto";

import { Group, Task } from "@/types";

export function newTask(params?: Partial<Task>): Task {
  return { id: randomUUID(), name: "new task", groupId: null, ...params };
}

export function newGroup(params?: Partial<Group>): Group {
  return { id: randomUUID(), name: "new group", groupId: null, ...params };
}
