import { useState } from "react";

import * as SwiftUI from "@expo/ui/swift-ui-primitives";

export default function Page() {
  const [_, setValue] = useState("");
  return (
    <SwiftUI.Host style={{ flex: 1 }}>
      <SwiftUI.Form>
        <SwiftUI.Section title="Name">
          <SwiftUI.TextInput placeholder="Nombre" onChangeText={setValue} />
        </SwiftUI.Section>
      </SwiftUI.Form>
    </SwiftUI.Host>
  );
}
