import { SampleViewModuleView } from "sample-view-module";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Native Module Test</Text>
        <Text style={styles.debugText}>Below is the native view:</Text>
        <View style={styles.viewContainer}>
          <SampleViewModuleView style={{ flex: 1, borderRadius: 10 }} />
        </View>
        <Text style={styles.debugText}>Above is the native view</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  debugText: {
    fontSize: 14,
    color: "#666",
    marginVertical: 10,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  view: {
    flex: 1,
    borderRadius: 10,
  },
});
