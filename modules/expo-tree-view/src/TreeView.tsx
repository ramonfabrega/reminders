import { requireNativeView } from "expo";
import { Host } from "@expo/ui/swift-ui";
import { SFSymbol } from "expo-symbols";
import { NativeSyntheticEvent } from "react-native";

const NativeView = requireNativeView("TreeView");

export type TreeViewNode = {
  id: string;
  name: string;
  children: TreeViewNode[] | null;
};

type Event<T = {}> = NativeSyntheticEvent<T>;

export type TreeViewProps<T extends string = string> = {
  title: string;
  nodes: TreeViewNode[];
  createActions: Array<{ id: T; title: string; icon: SFSymbol }>;
  onDelete?: (e: Event<{ id: string }>) => void;
  onSelect?: (e: Event<{ id: string }>) => void;
  onCreate?: (e: Event<{ groupId: string | null; actionId: T }>) => void;
};

export function TreeView<T extends string>({
  nodes,
  createActions,
  ...props
}: TreeViewProps<T>) {
  return (
    <NativeView {...props} nodes={s(nodes)} createActions={s(createActions)} />
  );
}

const s = (v: unknown) => JSON.stringify(v);
