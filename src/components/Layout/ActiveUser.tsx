import { Trans, useTranslation } from 'i18n';
import React from 'react';

import LinkText from '../Form/LinkText';

export default function ActiveUser({ waiting }): JSX.Element {
  const { t } = useTranslation(['myAccount']);
  return (
    <div className="active-user">
      <div className="container">
        <div className="text-center">
          {waiting ? (
            t('myAccount:waiting')
          ) : (
            <Trans
              i18nKey="myAccount:active"
              components={{
                Link: <LinkText href="/my-account"> </LinkText>
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
