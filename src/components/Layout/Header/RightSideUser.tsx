import { ClickAwayListener } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import NotiItem from 'src/components/Modules/Noti/NotiItem';
import { useNotify } from 'src/contexts/Notify';
import { useUser } from 'src/contexts/User';
import { Notifies } from 'src/graphql/notification/notify.query';
import { SEEN_NOTI } from 'src/graphql/notification/seenNoti.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

type NotiItem = {
  time: string;
  notiInfo: string;
};

const RightSideUser = () => {
  const { data: user } = useUser();

  const { t } = useTranslation(['noti', 'errors']);

  const { data, refetch } = useNotify();

  const [show, setShow] = useState(false);

  const [seenNotify] = useMutationAuth(SEEN_NOTI, {
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    },
    onCompleted: () => {
      refetch();
    }
  });

  function toggleShow() {
    setShow((show) => !show);
  }

  function handleNotiItemClick(notiItem: Notifies) {
    seenNotify({
      variables: {
        _id: notiItem._id
      }
    });
  }

  return (
    <div className="header-right d-none d-lg-block">
      <ul className="nav align-items-center">
        {/* Notifications here */}
        <ClickAwayListener onClickAway={() => setShow(false)}>
          <div
            onClick={toggleShow}
            onKeyPress={toggleShow}
            className={clsx('dropdown header-right__link notification mr-2', !show && 'collapsed')}
            role="button"
            tabIndex={0}>
            <i className="far fa-bell header-right__icon" />

            {data?.totalUnseen > 0 && (
              <span className="notification__counter">{data.totalUnseen}</span>
            )}

            <div
              className={clsx(
                'dropdown-menu dropdown-menu-right notification__dropdown p-0',
                show && 'show'
              )}>
              {data?.Notifies?.length > 0 && (
                <>
                  {data.Notifies.map((item, index) => (
                    <NotiItem key={index} {...item} onClick={() => handleNotiItemClick(item)} />
                  ))}

                  <div className="dropdown__item notification__view-all">
                    <Link href="/notifications">
                      <a>{t('navbar:see_all_notifications')}</a>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </ClickAwayListener>

        {user?.name && (
          <div className="header__user ml-3">
            <div className="header__user-name text-break text-center">
              {user?.company_name || user?.name || ''}
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default RightSideUser;
