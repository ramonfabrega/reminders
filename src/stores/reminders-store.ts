import { create } from "zustand";
import { randomUUID } from "expo-crypto";

import { Reminder } from "@/types";

type Store = {
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, "id">) => void;
  removeReminder: (id: string) => void;
  updateReminder: (id: string, updatedReminder: Partial<Reminder>) => void;
};

export const useReminders = create<Store>((set) => ({
  reminders: [],
  addReminder: (reminder) => {
    set((state) => ({
      reminders: [...state.reminders, { ...reminder, id: randomUUID() }],
    }));
  },
  removeReminder: (id) => {
    set((state) => ({
      reminders: state.reminders.filter((reminder) => reminder.id !== id),
    }));
  },
  updateReminder: (id, updatedReminder) => {
    set((state) => ({
      reminders: state.reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, ...updatedReminder } : reminder
      ),
    }));
  },
}));
