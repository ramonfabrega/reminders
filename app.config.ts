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
      foregroundImage: "./assets/icons/android.png",
      backgroundColor: "#ffffff",
    },
    package: config.bundleIdentifier,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: ["expo-router"],
} satisfies ExpoConfig;
