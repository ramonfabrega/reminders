import { create } from "zustand";

import { Group, Task } from "@/types";
import { newGroup, newTask } from "@/utils/factory";

type TaskStore = {
  tasks: Task[];
  groups: Group[];

  createRecord: (
    type: "tasks" | "groups",
    name: string,
    groupId: string | null
  ) => void;
  deleteRecord: (id: string) => boolean;
};

export const useTaskStore = create<TaskStore>((set, get) => {
  function findType(id: string) {
    const task = get().tasks.find((r) => r.id === id);
    if (task) return "tasks";

    const group = get().groups.find((g) => g.id === id);
    if (group) return "groups";

    return null;
  }

  const personal = newGroup({ name: "Personal" });
  const work = newGroup({ name: "Work" });
  const dev = newGroup({ name: "Dev", groupId: work.id });

  const groups = [personal, work, dev];

  const tasks: Task[] = [
    newTask({ name: "Doctor Appointment" }),
    newTask({ name: "Foo" }),
    newTask({ name: "Pasaporte", groupId: personal.id }),
    newTask({ name: "Cedula", groupId: personal.id }),
    newTask({ name: "Slack password", groupId: work.id }),
    newTask({ name: "Cloud password", groupId: dev.id }),
  ];

  return {
    tasks,
    groups,
    createRecord(type, name, groupId) {
      function newValue() {
        switch (type) {
          case "tasks":
            return newTask({ name, groupId });
          case "groups":
            return newGroup({ name, groupId });
        }
      }

      set((state) => ({ [type]: [...state[type], newValue()] }));
    },
    deleteRecord(id) {
      const type = findType(id);
      if (!type) return false;

      set((state) => ({ [type]: state[type].filter((r) => r.id !== id) }));
      return true;
    },
  };
});
