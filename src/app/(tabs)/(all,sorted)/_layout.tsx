import { Link, Stack } from "expo-router";
import {
  Button,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  ColorValue,
} from "react-native";
import { SymbolView, SymbolViewProps, SFSymbol } from "expo-symbols";
export const unstable_settings = {
  initialRouteName: "all",
  sorted: {
    initialRouteName: "sorted",
  },
};

import * as SwiftUI from "@expo/ui/swift-ui-primitives";

export default function SharedLayout({ segment }: { segment: string }) {
  console.log("segment", segment);
  return (
    <>
      <Stack
        screenOptions={{
          headerLargeTitle: true,
          headerTransparent: false,
          headerShadowVisible: false,
          headerSearchBarOptions: {
            placeholder: "Search...",
            onChangeText: (e) => console.log(e.nativeEvent.text),
          },
          // headerRight: () => (
          //   <SwiftUI.Host
          //     style={{ height: 50, width: 100, backgroundColor: "red" }}
          //   >
          //     <SwiftUI.ContextMenu>
          //       <SwiftUI.ContextMenu.Items>
          //         <SwiftUI.Button onPress={() => console.log("swift ui")}>
          //           testing
          //         </SwiftUI.Button>
          //       </SwiftUI.ContextMenu.Items>
          //     </SwiftUI.ContextMenu>
          //     <SwiftUI.ContextMenu.Trigger>
          //       <SwiftUI.Button onPress={() => console.log("swift ui")}>
          //         testing
          //       </SwiftUI.Button>
          //     </SwiftUI.ContextMenu.Trigger>
          //   </SwiftUI.Host>
          // ),
          headerRight: () => (
            <Label
              icon="plus"
              text="New"
              onPress={() => {
                console.log("pressed");
              }}
            />
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: segment }} />
        <Stack.Screen
          name="tasks/[task]"
          options={{
            title: "Task",
            headerSearchBarOptions: undefined,
            headerRight: () => (
              <Label
                icon="trash"
                text="Delete"
                onPress={() => {
                  console.log("pressed");
                }}
                color="red"
              />
            ),
          }}
        />
      </Stack>
      <Link
        href={{
          pathname: "/tasks/[task]",
          params: { task: `task-${segment}` },
        }}
        asChild
      >
        <Pressable style={{ padding: 20 }}>
          <Text>to task</Text>
        </Pressable>
      </Link>
    </>
  );
}

type LabelProps = {
  icon: SFSymbol;
  text: string;
  onPress: () => void;
  color?: ColorValue;
};
function Label({ icon, text, onPress, color }: LabelProps) {
  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.4 : 1 })}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <SymbolView name={icon} size={16} tintColor={color} />
        <View pointerEvents="none">
          <Button title={text} color={color} />
        </View>
      </View>
    </Pressable>
  );
}
