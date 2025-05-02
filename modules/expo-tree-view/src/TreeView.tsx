import { requireNativeView } from "expo";
import { SFSymbol } from "expo-symbols";
import { NativeSyntheticEvent } from "react-native";

const NativeView = requireNativeView("TreeView");

export type TreeViewNode = {
  id: string;
  name: string;
  children: TreeViewNode[] | null;
};

type TouchEvent<T = {}> = NativeSyntheticEvent<T>;

export type CreateAction<T = string> = {
  id: T;
  title: string;
  icon: SFSymbol;
};

export type TreeViewProps<T extends string = string> = {
  title: string;
  nodes: TreeViewNode[];
  createActions: CreateAction<T>[];
  onDelete?: (e: TouchEvent<{ id: string }>) => void;
  onSelect?: (e: TouchEvent<{ id: string }>) => void;
  onCreate?: (e: TouchEvent<{ groupId: string | null; actionId: T }>) => void;
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
