import * as Updates from "expo-updates";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";

export default function useUpdatesListener() {
  const appState = useRef(AppState.currentState);
  const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  useEffect(() => {
    const sub = AppState.addEventListener("change", (next) => {
      if (
        Updates.channel &&
        appState.current.match(/inactive|background/) &&
        next === "active"
      ) {
        Updates.checkForUpdateAsync();
      }
      appState.current = next;
    });

    if (isUpdatePending) {
      Updates.reloadAsync();
    }

    if (isUpdateAvailable) {
      Updates.fetchUpdateAsync();
    }

    return sub.remove;
  }, [isUpdatePending, isUpdateAvailable]);
}
