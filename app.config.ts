import { ExpoConfig } from "expo/config";
import pkg from "./package.json";

function getConfig() {
  switch (process.env.EXPO_PUBLIC_APP_ENV) {
    case "development":
      return {
        name: "Reminders (Dev)",
        bundleIdentifier: "com.ramonfabrega.reminders.dev",
      };
    case "preview":
      return {
        name: "Reminders (Preview)",
        bundleIdentifier: "com.ramonfabrega.reminders.preview",
      };
    case "production":
    default:
      return {
        name: "Reminders",
        bundleIdentifier: "com.ramonfabrega.reminders",
      };
  }
}

const config = getConfig();

export default {
  name: config.name,
  slug: "reminders",
  scheme: "reminders",
  version: pkg.version,
  owner: "ramonfabrega",
  orientation: "portrait",
  newArchEnabled: true,
  platforms: ["ios"],
  icon: "./assets/icon.png",
  ios: {
    supportsTablet: true,
    bundleIdentifier: config.bundleIdentifier,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    package: config.bundleIdentifier,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-sqlite",
    [
      "react-native-vision-camera",
      { cameraPermissionText: "$(PRODUCT_NAME) needs access to your Camera." },
    ],
  ],
  updates: {
    url: "https://u.expo.dev/b23ba4e9-9385-46e4-a27a-a44cfc5cb8a5",
  },
  runtimeVersion: {
    policy: "fingerprint",
  },
  extra: {
    eas: {
      projectId: "b23ba4e9-9385-46e4-a27a-a44cfc5cb8a5",
    },
  },
} satisfies ExpoConfig;
