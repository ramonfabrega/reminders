import { requireNativeView } from "expo";

const NativeView = requireNativeView("TreeView");

export type TreeViewNode = {
  id: string;
  name: string;
  children: TreeViewNode[] | null;
};

export type TreeViewProps = {
  title: string;
  nodes: TreeViewNode[];
};

export function TreeView({ nodes, ...props }: TreeViewProps) {
  return <NativeView {...props} nodes={JSON.stringify(nodes)} />;
}
