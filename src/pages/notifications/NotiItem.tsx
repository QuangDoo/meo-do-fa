import clsx from 'clsx';
import { useTranslation } from 'i18n';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { SEEN_NOTI } from 'src/graphql/notification/seenNoti.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useNoti from 'src/hooks/useNoti';

type Props = {
  _id: string;
  content: string;

  isSeen: boolean;

  create_date: string;
};

const NotiItem = (props: Props): JSX.Element => {
  const [seenNotify] = useMutationAuth(SEEN_NOTI);

  const { _id, content, isSeen, create_date } = props;

  const { refetchNoti } = useNoti();

  const { t } = useTranslation();

  const handleRead = () => {
    seenNotify({ variables: { _id } });
    refetchNoti();
  };
  return (
    <div className="col-12 mb-3">
      <button onClick={handleRead}>
        <Link href="/notifications/1571210">
          <a className={clsx('notification__item unread', isSeen && 'notification__item read')}>
            <div className="notification__icon">
              <i className="status-icon status-notice" />
            </div>
            <div className="notification__content">
              <div
                className="notification__content-title"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <small className="notification__content-created-at">
                {moment(create_date)
                  .locale(`${t('noti:time')}`)
                  .fromNow()}
              </small>
            </div>
          </a>
        </Link>
      </button>
    </div>
  );
};
export default NotiItem;
