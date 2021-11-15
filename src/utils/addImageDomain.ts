export const addImageDomainToContent = (content: string) => {
  const uri = process.env.GRAPHQL_GATEWAY_EXT;
  console.log('uri', uri);
  content = content?.replace(/<img/g, `<img style="width:100%;height: auto; object-fit: contain"`);
  if (content?.includes('src="/web/image')) {
    if (uri?.includes('graphql.dev.medofa.com')) {
      content = content?.replace(/src="/g, `src="https://erp.dev.medofa.com`);
    } else {
      content = content?.replace(/src="/g, `src="https://erp.medofa.com`);
    }
  }
  return content;
};
