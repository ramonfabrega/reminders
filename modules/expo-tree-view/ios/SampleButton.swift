import SwiftUI
import ExpoModulesCore

class SampleButtonProps: ExpoSwiftUI.ViewProps {
  @Field var title: String = "Hello world"
  // var onPress = EventDispatcher()
}

struct SampleButton: ExpoSwiftUI.View {
  @ObservedObject var props: SampleButtonProps

  var body: some View {
    SwiftUI.Button(props.title) {
      // props.onPress()
    }
  }
}
