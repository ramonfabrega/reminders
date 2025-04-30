import ExpoModulesCore

public class SampleButtonModule: Module {
  public func definition() -> ModuleDefinition {
    Name("SampleButton")
    View(SampleButton.self)
  }
}