import { ExpoConfig } from "expo/config";
import pkg from "./package.json";

function getConfig() {
  const name = "Document Reminders";
  const bundleIdentifier = "com.ramonfabrega.reminders";

  switch (process.env.EXPO_PUBLIC_APP_ENV) {
    case "development":
      return {
        name: `${name} (Dev)`,
        bundleIdentifier: `${bundleIdentifier}.dev`,
      };
    case "preview":
      return {
        name: `${name} (Preview)`,
        bundleIdentifier: `${bundleIdentifier}.preview`,
      };
    case "production":
    default:
      return { name, bundleIdentifier };
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
  platforms: ["ios", "web"],
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
    bundler: "metro",
    output: "static",
  },
  plugins: [
    "expo-router",
    "expo-sqlite",
    [
      "react-native-vision-camera",
      { cameraPermissionText: "$(PRODUCT_NAME) needs access to your Camera." },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
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
