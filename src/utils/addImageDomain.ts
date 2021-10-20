export const addImageDomainToContent = (content: string) => {
  if (typeof window !== 'undefined' && content) {
    const { hostname } = window.location;

    const imgDomain =
      hostname === 'medofa.com' ? 'https://erp.medofa.com' : 'https://erp.dev.medofa.com';

    return content.replace(/src="/g, `src="${imgDomain}/`);
  }

  return content;
};
