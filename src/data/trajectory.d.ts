declare module '*.yaml' {
  const data: {
    categories: {
      id: string;
      title: string;
      items: {
        text: string;
        done?: string;
        evidence?: string;
        evidenceLabel?: string;
        lapsed?: boolean;
        note?: string;
      }[];
    }[];
  };
  export default data;
}
