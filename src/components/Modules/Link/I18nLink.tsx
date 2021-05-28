import { i18n, useTranslation } from 'i18n';
import Link, { LinkProps } from 'next/link';
import React, { ReactNode, useMemo } from 'react';

type PropsLink = LinkProps & {
  children: ReactNode;
  href: string;
  className?: string;
};

export default function I18nLink(props: PropsLink) {
  const { children, href, className } = props;

  const { t } = useTranslation('routes');
  const i18nHref = useMemo(() => {
    return href
      .split('/')
      .map((path) => t(`routes:${path}`))
      .join('/');
  }, [i18n.language]);

  return (
    <Link href={i18nHref}>
      <a className={className}>{children}</a>
    </Link>
  );
}
