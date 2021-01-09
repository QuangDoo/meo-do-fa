/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SEEN_NOTI } from 'src/graphql/notification/seenNoti.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useNoti from 'src/hooks/useNoti';

type Props = {
  _id: string;

  description?: string;

  content: string;

  isSeen: boolean;

  create_date: string;

  isRead?: boolean;

  type: string;
};

const pageSize = 10;

const NotiItem = (props: Props) => {
  const [seenNotify] = useMutationAuth(SEEN_NOTI);

  const [dataContent, setDataContent] = useState('');

  const router = useRouter();

  const page = +router.query.page || 1;

  const { _id, content, create_date, description, type } = props;

  useEffect(() => {
    content === '10' && setDataContent(`${t('noti:10', { description })}`);
    content === '20' && setDataContent(`${t('noti:20', { description })}`);
    content === '25' && setDataContent(`${t('noti:25', { description })}`);
    content === '30' && setDataContent(`${t('noti:30', { description })}`);
    content === '40' && setDataContent(`${t('noti:40', { description })}`);
    content === '80' && setDataContent(`${t('noti:80', { description })}`);
  }, [content]);

  const { refetchNoti } = useNoti({ page, pageSize });

  const { t } = useTranslation();

  const handleRead = () => {
    seenNotify({ variables: { _id } });
    refetchNoti();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="col-12 mb-3" onClick={handleRead}>
      {type === 'order' && (
        <Link href={`/my-orders/${description}`}>
          <a
            className={clsx(
              'notification__item unread',
              props.isSeen && 'notification__item read'
            )}>
            <div className="notification__icon">
              <i className="status-icon status-notice" />
            </div>
            <div className="notification__content">
              <div
                className="notification__content-title"
                dangerouslySetInnerHTML={{ __html: dataContent }}
              />
              <small className="notification__content-created-at">
                {moment(create_date)
                  .locale(`${t('noti:time')}`)
                  .fromNow()}
              </small>
            </div>
          </a>
        </Link>
      )}
    </div>
  );
};
export default NotiItem;
