/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { Notifies } from 'src/graphql/notification/notify.query';

type Props = Notifies & {
  onClick?: () => void;
};

const NotiItem = (props: Props) => {
  const { content, create_date, description, type } = props;

  const { t } = useTranslation('noti');

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="col-12 p-0" onClick={props.onClick}>
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
                dangerouslySetInnerHTML={{
                  __html: t(`noti:${content}`, { description })
                }}
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
