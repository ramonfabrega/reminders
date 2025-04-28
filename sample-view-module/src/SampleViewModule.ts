import { NativeModule, requireNativeModule } from 'expo';

import { SampleViewModuleEvents } from './SampleViewModule.types';

declare class SampleViewModule extends NativeModule<SampleViewModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<SampleViewModule>('SampleViewModule');
