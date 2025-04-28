// Reexport the native module. On web, it will be resolved to SampleViewModule.web.ts
// and on native platforms to SampleViewModule.ts
export { default } from "./SampleViewModule";
export { default as SampleViewModuleView } from "./SampleViewModuleView";
export * from "./SampleViewModule.types";
