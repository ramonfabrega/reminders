import { requireNativeView } from "expo";
import * as React from "react";

import { SampleViewModuleViewProps } from "./SampleViewModule.types";

const NativeView: React.ComponentType<SampleViewModuleViewProps> =
  requireNativeView("SampleViewModule");

export default function SampleViewModuleView(props: SampleViewModuleViewProps) {
  return <NativeView {...props} />;
}
