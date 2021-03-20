import { Trans } from 'i18n';
import React from 'react';

import { mainLayoutNamespacesRequired } from '../Modules/MainLayout';

ActiceUser.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'myAccount']
});

export default function ActiceUser(): JSX.Element {
  return (
    <div className="active-user">
      <div className="container">
        <div className="text-center">
          <Trans
            i18nKey="myAccount:active"
            components={{
              Link: (
                <a href="/my-account" target="_blank">
                  {' '}
                </a>
              )
            }}
          />
          {/* <p>{t('myAccount:active')}</p> */}
        </div>
      </div>
    </div>
  );
}
