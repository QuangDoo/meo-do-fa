/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SEEN_NOTI } from 'src/graphql/notification/seenNoti.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useNoti from 'src/hooks/useNoti';

type Props = {
  _id: string;
  content: string;

  isSeen: boolean;

  create_date: string;

  isRead: boolean;
};

const NotiItem = (props: Props): JSX.Element => {
  const [seenNotify] = useMutationAuth(SEEN_NOTI);

  const [seenState, setSeenState] = useState(props.isSeen);

  const [dataContent, setDataContent] = useState('');

  const { _id, content, create_date } = props;

  useEffect(() => {
    content === '10' && setDataContent('Đơn hàng đặt thành công');
    content === '25' && setDataContent('Gì đó không biết');
    content === '30' && setDataContent('Gì đó không biết 2');
    content === '40' && setDataContent('Gì đó không biết 3');
    content === '80' && setDataContent('Gì đó không biết 3');
  }, [content]);

  const { refetchNoti } = useNoti();

  const { t } = useTranslation();

  const handleRead = () => {
    seenNotify({ variables: { _id } });
    refetchNoti();
  };

  useEffect(() => {
    if (!props.isRead) return;
    setSeenState(true);
  }, [props.isRead]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="col-12 mb-3">
      <Link href="/#">
        <a className={clsx('notification__item unread', seenState && 'notification__item read')}>
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
    </div>
  );
};
export default NotiItem;
