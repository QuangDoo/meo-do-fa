export const addImageDomainToContent = (content: string) => {
  content = content?.replace(/<img/g, `<img style="width:100%;height: auto; object-fit: contain"`);
  if (typeof window !== 'undefined' && content) {
    const { hostname } = window.location;
    if (content?.includes('src="/web/image')) {
      const imgDomain =
        hostname === 'medofa.com' ? 'https://erp.medofa.com' : 'https://erp.dev.medofa.com';
      content.replace(/src="/g, `src="${imgDomain}/`);
    }
  }

  return content;
};
