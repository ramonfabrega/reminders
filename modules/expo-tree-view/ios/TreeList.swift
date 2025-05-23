import SwiftUI

struct CreateActionData: Identifiable, Codable {
    let id: String
    let title: String
    let icon: String
}

struct CreateAction: Identifiable {
    let data: CreateActionData
    let action: (String?) -> Void
    var id: String { data.id }
}

@available(iOS 17.0, *)
struct CreateActionButton: View {
    let createActions: [CreateAction]
    let parentId: String?
    let onCreate: (String?) -> Void
    @State private var newButtonPressed = false

    var body: some View {
        if createActions.count == 1 {
            Button {
                newButtonPressed.toggle()
                onCreate(parentId)
                if let action = createActions.first {
                    action.action(parentId)
                }
            } label: {
                HStack {
                    Image(systemName: createActions.first?.data.icon ?? "plus")
                    Text("New")
                }
            }
            .sensoryFeedback(.impact(weight: .medium), trigger: newButtonPressed)
        } else {
            Menu {
                ForEach(createActions) { action in
                    Button {
                        newButtonPressed.toggle()
                        onCreate(parentId)
                        action.action(parentId)
                    } label: {
                        Label(action.data.title, systemImage: action.data.icon)
                    }
                }
            } label: {
                HStack {
                    Image(systemName: "plus")
                    Text("New")
                }
            }
            .sensoryFeedback(.impact(weight: .medium), trigger: newButtonPressed)
        }
    }
}

struct Node: Hashable, Identifiable, Codable {
    let id: String
    let name: String
    var children: [Node]? = nil
}

@available(iOS 17.0, *)
struct TreeList: View {
    let title: String
    let nodes: [Node]
    let onDelete: (String) -> Void
    let onSelect: (String) -> Void
    let createActions: [CreateAction]
    @State private var searchText: String = ""
    @State private var expanded = Set<String>()
    @State private var savedExpanded: Set<String>? = nil

    private func filtered(_ items: [Node]) -> [Node] {
        items.compactMap { node in
            if let kids = node.children {
                let sub = filtered(kids)
                if !sub.isEmpty {
                    var copy = node
                    copy.children = sub
                    return copy
                }
            }
            if node.name.localizedCaseInsensitiveContains(searchText) {
                return node
            }
            return nil
        }
    }

    private func allBranchIDs(in items: [Node]) -> [String] {
        items.flatMap { node in
            var ids: [String] = []
            if let kids = node.children, !kids.isEmpty {
                ids.append(node.id)
                ids.append(contentsOf: allBranchIDs(in: kids))
            }
            return ids
        }
    }

    var allExpanded: Bool {
        let tree = searchText.isEmpty ? nodes : filtered(nodes)
        let allBranchIds = Set(allBranchIDs(in: tree))
        return !allBranchIds.isEmpty && allBranchIds.isSubset(of: expanded)
    }

    private func handleCreate(parentId: String?) {
        if let parentId = parentId {
            _ = withAnimation {
                expanded.insert(parentId)
            }
        }
    }

    var body: some View {
        NavigationView {
            List {
                ForEach(searchText.isEmpty ? nodes : filtered(nodes)) { item in
                    TreeNodeView(node: item, expanded: $expanded, onSelect: onSelect, onDelete: onDelete, createActions: createActions, onCreate: handleCreate)
                }
            }
            .navigationTitle(title)
            .toolbar {
                CreateActionButton(createActions: createActions, parentId: nil, onCreate: handleCreate)
            }
            .searchable(text: $searchText, prompt: "Search…")
            .onChange(of: searchText) {
                if searchText.isEmpty {
                    if let saved = savedExpanded {
                        withAnimation { expanded = saved }
                        savedExpanded = nil
                    }
                } else {
                    if savedExpanded == nil { savedExpanded = expanded }
                    let filteredNodes = filtered(nodes)
                    expanded = Set(allBranchIDs(in: filteredNodes))
                }
            }
        }
    }
}

@available(iOS 17.0, *)
struct TreeNodeView: View {
    let node: Node
    @Binding var expanded: Set<String>
    let onSelect: (String) -> Void
    let onDelete: (String) -> Void
    let createActions: [CreateAction]
    let onCreate: (String?) -> Void

    var body: some View {
        if let children = node.children {
            if children.isEmpty {
                EmptyGroupNode(node: node, onDelete: onDelete, createActions: createActions, onCreate: onCreate)
            } else {
                GroupNode(node: node, expanded: $expanded, onSelect: onSelect, onDelete: onDelete, createActions: createActions, onCreate: onCreate)
            }
        } else {
            LeafNode(node: node, onSelect: onSelect, onDelete: onDelete)
        }
    }
}

@available(iOS 17.0, *)
struct LeafNode: View {
    let node: Node
    let onSelect: (String) -> Void
    let onDelete: (String) -> Void
    @State private var isSelected = false
    @State private var deleteTriggered = false

    var body: some View {
        Button {
            isSelected.toggle()
            onSelect(node.id)
        } label: {
            Text("📄 \(node.name)")
        }
        .sensoryFeedback(.impact(weight:.light), trigger: isSelected)
        .swipeActions(edge: .trailing, allowsFullSwipe: false) {
            Button(role: .destructive) {
                deleteTriggered.toggle()
                onDelete(node.id)
            } label: {
                Label("Delete", systemImage: "trash")
            }
        }
        .sensoryFeedback(.impact(weight: .heavy), trigger: deleteTriggered)
    }
}

@available(iOS 17.0, *)
struct EmptyGroupNode: View {
    let node: Node
    let onDelete: (String) -> Void
    let createActions: [CreateAction]
    let onCreate: (String?) -> Void
    @State private var deleteTriggered = false

    var body: some View {
        Text("📂 \(node.name)")
            .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                Button(role: .destructive) {
                    deleteTriggered.toggle()
                    onDelete(node.id)
                } label: {
                    Label("Delete", systemImage: "trash")
                }

                CreateActionButton(createActions: createActions, parentId: node.id, onCreate: onCreate)
            }
            .sensoryFeedback(.impact(weight: .heavy), trigger: deleteTriggered)
    }
}

@available(iOS 17.0, *)
struct GroupNode: View {
    let node: Node
    @Binding var expanded: Set<String>
    let onSelect: (String) -> Void
    let onDelete: (String) -> Void
    let createActions: [CreateAction]
    let onCreate: (String?) -> Void

    var body: some View {
        DisclosureGroup(
            isExpanded: Binding(
                get: { expanded.contains(node.id) },
                set: { newVal in
                    withAnimation {
                        if newVal { expanded.insert(node.id) }
                        else { expanded.remove(node.id) }
                    }
                }
            )
        ) {
            ForEach(node.children!) { child in
                TreeNodeView(
                    node: child,
                    expanded: $expanded,
                    onSelect: onSelect,
                    onDelete: onDelete,
                    createActions: createActions,
                    onCreate: onCreate
                )
            }
        } label: {
            Text("📁 \(node.name)")
                .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                    CreateActionButton(createActions: createActions, parentId: node.id, onCreate: onCreate)
                        .tint(.accentColor)
                }
        }
        .sensoryFeedback(.impact(weight: .light), trigger: expanded.contains(node.id))
    }
}

#if SWIFT_PACKAGE
#Preview {
    TreeList(
        title: "File System",
        nodes: [
            Node(id: "1", name: "users", children: [
                Node(id: "2", name: "user1234", children: [
                    Node(id: "3", name: "Photos", children: [
                        Node(id: "4", name: "photo001.jpg"),
                        Node(id: "5", name: "photo002.jpg")
                    ]),
                    Node(id: "6", name: "Movies", children: [
                        Node(id: "7", name: "movie001.mp4")
                    ]),
                    Node(id: "8", name: "Documents", children: [])
                ]),
                Node(id: "9", name: "newuser", children: [
                    Node(id: "10", name: "Documents", children: [])
                ])
            ]),
            Node(id: "11", name: "private", children: nil)
        ],
        onDelete: { _ in },
        onSelect: { _ in },
        createActions: [
            CreateAction(
                data: CreateActionData(
                    id: "item",
                    title: "New Item",
                    icon: "plus"
                ),
                action: { parentId in
                    print("Creating new item in \(parentId ?? "root")")
                }
            ),
            CreateAction(
                data: CreateActionData(
                    id: "folder",
                    title: "New Folder",
                    icon: "folder.badge.plus"
                ),
                action: { parentId in
                    print("Creating new folder in \(parentId ?? "root")")
                }
            )
        ]
    )
}
#endif
