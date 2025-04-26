import { Group, Reminder } from "@/types";
import { randomUUID } from "expo-crypto";

export function newReminder(params?: Partial<Reminder>): Reminder {
  return {
    id: randomUUID(),
    name: "new reminder",
    groupId: null,
    ...params,
  };
}

export function newGroup(params?: Partial<Group>): Group {
  return {
    id: randomUUID(),
    name: "new group",
    parentGroupId: null,
    childGroupIds: [],
    ...params,
  };
}
