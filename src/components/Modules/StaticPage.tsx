import { useTranslation } from 'i18n';
import React from 'react';

function StaticPage(props) {
  const { t } = useTranslation(['common']);
  const { pageContent } = props;

  return (
    <div className="container my-5">
      {pageContent?.length !== 0 ? (
        <div
          dangerouslySetInnerHTML={{
            __html: pageContent?.[0].content
          }}
        />
      ) : (
        <div className="d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </div>
      )}
    </div>
  );
}

export default StaticPage;
