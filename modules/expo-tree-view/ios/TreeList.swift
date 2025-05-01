import SwiftUI

struct Node: Hashable, Identifiable {
    let id = UUID()
    let name: String
    var children: [Node]? = nil
}

let nodes: [Node] = [
    Node(name: "users", children: [
      Node(name: "user1234", children: [
        Node(name: "Photos", children: [
          Node(name: "photo001.jpg"),
          Node(name: "photo002.jpg")
        ]),
        Node(name: "Movies", children: [
          Node(name: "movie001.mp4")
        ]),
        Node(name: "Documents", children: [])
      ]),
      Node(name: "newuser", children: [
        Node(name: "Documents", children: [])
      ])
    ]),
    Node(name: "private", children: nil)
]

@available(iOS 17.0, *)
struct TreeList: View {
    @State private var lastSelected: String? = nil
    @State private var lastDeleted: String? = nil
    @State private var searchText: String = ""
    @State private var expanded = Set<UUID>()
    @State private var savedExpanded: Set<UUID>? = nil

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

    private func allBranchIDs(in items: [Node]) -> [UUID] {
        items.flatMap { node in
            var ids: [UUID] = []
            if let kids = node.children, !kids.isEmpty {
                ids.append(node.id)
                ids.append(contentsOf: allBranchIDs(in: kids))
            }
            return ids
        }
    }

    private func expandAll() {
        withAnimation {
            let tree = searchText.isEmpty ? nodes : filtered(nodes)
            expanded = Set(allBranchIDs(in: tree))
        }
    }

    private func collapseAll() {
        withAnimation {
            expanded.removeAll()
        }
    }

    var allExpanded: Bool {
        let tree = searchText.isEmpty ? nodes : filtered(nodes)
        let allBranchIds = Set(allBranchIDs(in: tree))
        return !allBranchIds.isEmpty && allBranchIds.isSubset(of: expanded)
    }

    var body: some View {
        NavigationView {
            List {
                ForEach(searchText.isEmpty ? nodes : filtered(nodes)) { item in
                    TreeNodeView(node: item, expanded: $expanded, lastSelected: $lastSelected, lastDeleted: $lastDeleted)
                }
            }
            .navigationTitle("File System")
            .toolbar {
                Button(action: {
                    if allExpanded {
                        collapseAll()
                    } else {
                        expandAll()
                    }
                }) {
                    HStack {
                        Image(systemName: "chevron.up.chevron.down")
                        ZStack {
                            Text("Collapse All")
                                .opacity(allExpanded ? 1 : 0)
                                .animation(.easeInOut(duration: 0.2), value: allExpanded)
                            Text("Expand All")
                                .opacity(allExpanded ? 0 : 1)
                                .animation(.easeInOut(duration: 0.2), value: allExpanded)
                        }
                        .fixedSize()
                    }
                }

                Button(action: { }) {
                    Image(systemName: "plus")
                    Text("New")
                }
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

        VStack(alignment: .leading) {
            Text("Last selected file: \(lastSelected ?? "none")")
            Text("Last deleted file: \(lastDeleted ?? "none")")
        }
        .padding(.top, 8)
    }
}

@available(iOS 17.0, *)
struct TreeNodeView: View {
    let node: Node
    @Binding var expanded: Set<UUID>
    @Binding var lastSelected: String?
    @Binding var lastDeleted: String?

    var body: some View {
        if let children = node.children {
            if children.isEmpty {
                Text("📂 \(node.name)")
            } else {
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
                    ForEach(children) { child in
                        TreeNodeView(node: child, expanded: $expanded, lastSelected: $lastSelected, lastDeleted: $lastDeleted)
                    }
                } label: {
                    Text("📁 \(node.name)")
                }
                .sensoryFeedback(.impact(weight: .light), trigger: expanded.contains(node.id))
            }
        } else {
            Button {
                lastSelected = node.name
            } label: {
                Text("📄 \(node.name)")
            }
            .tint(.primary)
            .sensoryFeedback(.impact(weight:.light), trigger: lastSelected)
            .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                Button(role: .destructive) {
                    lastDeleted = node.name
                } label: {
                    Label("Delete", systemImage: "trash")
                }
            }
        }
    }
}

#if SWIFT_PACKAGE
#Preview {
  TreeList()
}
#endif
