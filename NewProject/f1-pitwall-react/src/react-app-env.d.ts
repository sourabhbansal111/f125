/// <reference types="react-scripts" />

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      'camera-controls'?: boolean;
      'auto-rotate'?: boolean;
      'auto-rotate-delay'?: string;
      'rotation-per-second'?: string;
      'shadow-intensity'?: string;
      'environment-image'?: string;
      exposure?: string;
      'camera-orbit'?: string;
      'min-camera-orbit'?: string;
      'max-camera-orbit'?: string;
    };
  }
}