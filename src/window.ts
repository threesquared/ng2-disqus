import { OpaqueToken } from '@angular/core';

export class MockWindow {
  public DISQUS: {
    reset: (params: {}) => {}
  };
  public disqus_config: () => void;
}

export const Window = new OpaqueToken('window');
export const WindowProviders = [
    { provide: Window, useFactory: () => (window) ? window : MockWindow }
];
