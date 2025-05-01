import { requireNativeView } from "expo";

const NativeView = requireNativeView("SampleButton");

export type SampleButtonProps = {
  title?: string;
  // onPress: () => void;
};

export function SampleButton(props: SampleButtonProps) {
  return <NativeView {...props} />;
}
