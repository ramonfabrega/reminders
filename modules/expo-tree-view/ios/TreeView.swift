import SwiftUI
import ExpoModulesCore

class TreeViewProps: ExpoSwiftUI.ViewProps {}

struct TreeView: ExpoSwiftUI.View {
  @ObservedObject var props: TreeViewProps

  var body: some View {
    if #available(iOS 17.0, *) {
      TreeList()
    } else {
      EmptyView()
    }
  }
}