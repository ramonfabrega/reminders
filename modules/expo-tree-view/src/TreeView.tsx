import { requireNativeView } from "expo";

const NativeView = requireNativeView("TreeView");

export type TreeViewProps = {};

export function TreeView(props: TreeViewProps) {
  return <NativeView {...props} />;
}
