import { Reminder, Group } from "@/types";
import { TreeViewNode } from "@modules/expo-tree-view";

export function buildTree(
  reminders: Reminder[],
  groups: Group[]
): TreeViewNode[] {
  const groupsByParent = groupBy(groups, (g) => g.groupId);
  const remindersByGroup = groupBy(reminders, (r) => r.groupId);

  function buildChildren(parentId: string | null): TreeViewNode[] {
    const leafs = (remindersByGroup.get(parentId) || []).map((r) => ({
      id: r.id,
      name: r.name,
      children: null,
    }));

    const folders = (groupsByParent.get(parentId) || []).map((g) => ({
      id: g.id,
      name: g.name,
      children: buildChildren(g.id),
    }));

    return [...leafs, ...folders].sort((a, b) => a.name.localeCompare(b.name));
  }

  return buildChildren(null);
}

function groupBy<T, K extends string | null>(
  items: T[],
  keyFn: (item: T) => K
): Map<K, T[]> {
  return items.reduce((map, item) => {
    const key = keyFn(item);
    const arr = map.get(key) ?? [];
    arr.push(item);
    map.set(key, arr);
    return map;
  }, new Map<K, T[]>());
}
