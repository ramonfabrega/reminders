import SwiftUI
import ExpoModulesCore

class TreeViewProps: ExpoSwiftUI.ViewProps {
    @Field var title: String = ""
    @Field var nodes: String = ""
    var onCreate = EventDispatcher()
    var onDelete = EventDispatcher()
    var onSelect = EventDispatcher()
}

struct TreeView: ExpoSwiftUI.View {
    @ObservedObject var props: TreeViewProps

    private func parseNodes() -> [Node] {
        guard let data = props.nodes.data(using: .utf8) else {
            return []
        }
        do {
            return try JSONDecoder().decode([Node].self, from: data)
        } catch {
            return []
        }
    }

    var body: some View {
        if #available(iOS 17.0, *) {
            TreeList(
                title: props.title,
                nodes: parseNodes(),
                onCreate: { id in props.onCreate(["groupId": id ?? NSNull()]) },
                onDelete: { id in props.onDelete(["id": id]) },
                onSelect: { id in props.onSelect(["id": id]) }
            )
        } else {
            EmptyView()
        }
    }
}

