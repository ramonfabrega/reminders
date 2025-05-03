import { create } from "zustand";

import { Group, Reminder } from "@/types";
import { newGroup, newReminder } from "@/utils/factory";

type ReminderStore = {
  reminders: Reminder[];
  groups: Group[];

  createRecord: (
    type: "reminders" | "groups",
    name: string,
    groupId: string | null
  ) => void;
  deleteRecord: (id: string) => boolean;
};

export const useReminderStore = create<ReminderStore>((set, get) => {
  function findType(id: string) {
    const reminder = get().reminders.find((r) => r.id === id);
    if (reminder) return "reminders";

    const group = get().groups.find((g) => g.id === id);
    if (group) return "groups";

    return null;
  }

  const personal = newGroup({ name: "Personal" });
  const work = newGroup({ name: "Work" });
  const dev = newGroup({ name: "Dev", groupId: work.id });

  const groups = [personal, work, dev];

  const reminders: Reminder[] = [
    newReminder({ name: "Doctor Appointment" }),
    newReminder({ name: "Foo" }),
    // newReminder({ name: "bar" }),
    // newReminder({ name: "bar" }),
    // newReminder({ name: "bar" }),
    // newReminder({ name: "bar" }),
    // newReminder({ name: "bar" }),
    // newReminder({ name: "bar" }),
    // newReminder({ name: "bar" }),
    // newReminder({ name: "bar" }),
    // newReminder({ name: "bar" }),
    // newReminder({ name: "bar" }),
    // newReminder({ name: "bar" }),

    newReminder({ name: "Pasaporte", groupId: personal.id }),
    newReminder({ name: "Cedula", groupId: personal.id }),
    newReminder({ name: "Slack password", groupId: work.id }),
    newReminder({ name: "Cloud password", groupId: dev.id }),
  ];

  return {
    reminders,
    groups,
    createRecord(type, name, groupId) {
      function newValue() {
        switch (type) {
          case "reminders":
            return newReminder({ name, groupId });
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
