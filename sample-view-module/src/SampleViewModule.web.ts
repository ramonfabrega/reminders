import { registerWebModule, NativeModule } from 'expo';

import { SampleViewModuleEvents } from './SampleViewModule.types';

class SampleViewModule extends NativeModule<SampleViewModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(SampleViewModule);
