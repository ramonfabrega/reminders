import SwiftUI
import ExpoModulesCore

class TreeViewProps: ExpoSwiftUI.ViewProps {
    @Field var title: String = ""
    @Field var nodes: String = ""
    @Field var createActions: String = ""
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

    private func parseCreateActions() -> [CreateAction] {
        guard let data = props.createActions.data(using: .utf8) else {
            return []
        }
        do {
            let actions = try JSONDecoder().decode([CreateActionData].self, from: data)
            return actions.map { action in
                CreateAction(
                    data: action,
                    action: { parentId in
                        props.onCreate([
                            "groupId": parentId ?? NSNull(),
                            "actionId": action.id
                        ])
                    }
                )
            }
        } catch {
            return []
        }
    }

    var body: some View {
        if #available(iOS 17.0, *) {
            TreeList(
                title: props.title,
                nodes: parseNodes(),
                onDelete: { id in props.onDelete(["id": id]) },
                onSelect: { id in props.onSelect(["id": id]) },
                createActions: parseCreateActions()
            )
        } else {
            EmptyView()
        }
    }
}

