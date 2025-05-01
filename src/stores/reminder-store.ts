import { create } from "zustand";

import { Group, Reminder } from "@/types";
import { newGroup, newReminder } from "@/utils/factory";

type ReminderStore = {
  reminders: Reminder[];
  groups: Group[];
  addReminder: (name: string, groupId?: string) => void;
  deleteReminder: (id: string) => void;
};

const groups: Group[] = [
  newGroup({ name: "Personal" }),
  newGroup({ name: "Work" }),
];

const reminders: Reminder[] = [
  newReminder({ name: "Doctor Appointment" }),
  newReminder({ name: "Pasaporte", groupId: groups[0].id }),
  newReminder({ name: "Cedula", groupId: groups[0].id }),
  newReminder({ name: "Cloud password", groupId: groups[1].id }),
];

export const useReminderStore = create<ReminderStore>((set) => ({
  reminders,
  groups,
  addReminder: (name: string, groupId: string | null = null) =>
    set((state) => ({
      reminders: [...state.reminders, newReminder({ name, groupId })],
    })),
  deleteReminder: (id: string) =>
    set((state) => ({
      reminders: state.reminders.filter((r) => r.id !== id),
    })),
}));
