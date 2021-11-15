export const addImageDomainToContent = (content: string) => {
  const uri = process.env.GRAPHQL_GATEWAY;
  content = content?.replace(/<img/g, `<img style="width:100%;height: auto; object-fit: contain"`);
  if (content?.includes('src="/web/image')) {
    if (uri?.includes('graphql.medofa.com')) {
      content = content?.replace(/src="/g, `src="https://erp.medofa.com`);
    } else {
      content = content?.replace(/src="/g, `src="https://erp.dev.medofa.com`);
    }
  }
  return content;
};
