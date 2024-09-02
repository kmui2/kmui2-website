// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
import '../.astro/types.d.ts';
declare module '*.ttf' {
  const src: string;
  export default src;
}

// declare module '*.yaml' {
//   const content: any;
//   export default content;
// }

declare module '*/content.yaml' {
  const content: {
    skills: string[];
    techStack: string[];
    experience: {
      title: string;
      company: string;
      period: string;
      location: string;
      points: string[];
    }[];
  };
  export default content;
}

declare module 'react-solid-bridge' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SolidToReactBridgeProvider: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertToSolidComponent: any;

  export { SolidToReactBridgeProvider, convertToSolidComponent };
}
