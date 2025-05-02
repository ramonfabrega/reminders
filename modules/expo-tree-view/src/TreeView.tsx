import { requireNativeView } from "expo";
import { NativeSyntheticEvent } from "react-native";

const NativeView = requireNativeView("TreeView");

export type TreeViewNode = {
  id: string;
  name: string;
  children: TreeViewNode[] | null;
};

type TouchEvent<T = {}> = NativeSyntheticEvent<T>;

export type TreeViewProps = {
  title: string;
  nodes: TreeViewNode[];
  onCreate?: (e: TouchEvent<{ groupId: string | null }>) => void;
  onDelete?: (e: TouchEvent<{ id: string }>) => void;
  onSelect?: (e: TouchEvent<{ id: string }>) => void;
};

export function TreeView({ nodes, ...props }: TreeViewProps) {
  return <NativeView {...props} nodes={JSON.stringify(nodes)} />;
}
