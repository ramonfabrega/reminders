import * as React from 'react';

import { SampleViewModuleViewProps } from './SampleViewModule.types';

export default function SampleViewModuleView(props: SampleViewModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
