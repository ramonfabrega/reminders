import { create } from "zustand";

import { Group, Reminder } from "@/types";
import { newGroup, newReminder } from "@/utils/factory";

type ReminderStore = {
  reminders: Reminder[];
  groups: Group[];
  addReminder: (name: string, groupId?: string) => void;
  deleteReminder: (id: string) => void;
};

const personal = newGroup({ name: "Personal" });
const work = newGroup({ name: "Work" });
const dev = newGroup({ name: "Dev", groupId: work.id });

const groups = [personal, work, dev];

const reminders: Reminder[] = [
  newReminder({ name: "Doctor Appointment" }),
  newReminder({ name: "Pasaporte", groupId: personal.id }),
  newReminder({ name: "Cedula", groupId: personal.id }),
  newReminder({ name: "Slack password", groupId: work.id }),
  newReminder({ name: "Cloud password", groupId: dev.id }),
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
