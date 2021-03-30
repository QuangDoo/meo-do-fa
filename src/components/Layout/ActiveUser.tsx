import { Trans } from 'i18n';
import React from 'react';

import LinkText from '../Form/LinkText';

export default function ActiveUser(): JSX.Element {
  return (
    <div className="active-user">
      <div className="container">
        <div className="text-center">
          <Trans
            i18nKey="myAccount:active"
            components={{
              Link: <LinkText href="/my-account"> </LinkText>
            }}
          />
        </div>
      </div>
    </div>
  );
}
