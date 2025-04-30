import { requireNativeView } from "expo";

import { SampleButtonProps } from "./SampleButton.types";

const NativeView = requireNativeView("SampleButton");

export default function SampleButton(props: SampleButtonProps) {
  return <NativeView {...props} />;
}
