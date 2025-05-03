import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  usePathname,
} from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Page() {
  const { task } = useLocalSearchParams();

  const pathname = usePathname();

  console.log("pathname", pathname);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>task: {task}</Text>
    </View>
  );
}
