import { useTranslation } from 'i18n';
import React from 'react';

function StaticPage(props) {
  const { t, i18n } = useTranslation(['common']);
  const { pageContent } = props;
  console.log(pageContent);

  return (
    <div className="container my-5">
      {pageContent?.length !== 0 ? (
        i18n?.language === 'vi' ? (
          <div
            dangerouslySetInnerHTML={{
              __html: pageContent?.[0].content
            }}
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: pageContent?.[0].content_en
            }}
          />
        )
      ) : (
        <div className="d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </div>
      )}
    </div>
  );
}

export default StaticPage;
