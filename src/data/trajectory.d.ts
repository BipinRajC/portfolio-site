declare module '*.yaml' {
  const data: {
    categories: {
      id: string;
      title: string;
      items: { text: string; done?: string; evidence?: string }[];
    }[];
  };
  export default data;
}
