declare module '*.ttf' {
  const src: string;
  export default src;
}
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
