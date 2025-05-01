import { Reminder, Group } from "@/types";
import { TreeViewNode } from "@modules/expo-tree-view";
import { newNode } from "./factory";

export function buildTree(
  reminders: Reminder[],
  groups: Group[]
): TreeViewNode[] {
  // First, build a map of all groups for quick lookup
  const groupMap = new Map(groups.map((g) => [g.id, g]));

  // Pre-filter reminders by group ID
  const remindersByGroup = new Map<string, Reminder[]>();
  reminders.forEach((reminder) => {
    const groupId = reminder.groupId ?? "root";
    if (!remindersByGroup.has(groupId)) {
      remindersByGroup.set(groupId, []);
    }
    remindersByGroup.get(groupId)!.push(reminder);
  });

  // Helper function to build a node from a group
  const buildGroupNode = (group: Group): TreeViewNode => {
    // Get all child groups
    const childGroups = group.childGroupIds
      .map((id) => groupMap.get(id))
      .filter((g): g is Group => g !== undefined)
      .map(buildGroupNode);

    // Get reminders for this group (O(1) lookup)
    const groupReminders = remindersByGroup.get(group.id) ?? [];
    const childReminders = groupReminders.map(newNode);

    return newNode({ ...group, children: [...childGroups, ...childReminders] });
  };

  // Start with root groups (parentGroupId is null)
  const rootGroups = groups.filter((g) => g.parentGroupId === null);

  // Build the tree starting from root groups
  const rootNodes = rootGroups.map(buildGroupNode);

  // Add root-level reminders (groupId is null)
  const rootReminders = (remindersByGroup.get("root") ?? []).map(newNode);

  return [...rootNodes, ...rootReminders];
}
