import ExpoModulesCore

public class TreeViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("TreeView")
    View(TreeView.self)
  }
}