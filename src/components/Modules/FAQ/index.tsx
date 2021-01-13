import { useTranslation } from 'i18n';
import React from 'react';

import FAQSidebar from '../../Layout/SideBar/FAQSidebar';
import InputSearch from '../News/InputSearch';
// import Contact from './Contact';

type Props = {
  children?: React.ReactNode;
  questions?: any;
  title?: string;
  categories?: any;
};

export default function FAQ(props: Props) {
  const { t } = useTranslation('help');

  const categories = [
    { href: '/help/account', title: t('help:question_account') },
    { href: '/help/checkout', title: t('help:question_checkout') },
    { href: '/help/delivery', title: t('help:question_delivery') },
    { href: '/help/refund', title: t('help:question_refund') },
    { href: '/help/order', title: t('help:question_order') },
    { href: '/help/bank_transfer_guide', title: t('help:question_bank_transfer_guide') }
  ];

  return (
    <>
      <div className="container help">
        {/* <div className="row">
          <div className="col-12">
            <div className="wrapper">
              <div className="mb-3 mt-3">
                <InputSearch placeholder="Search..." keySearch={(x) => console.log(x)} />
              </div>
            </div>
          </div>
        </div> */}

        <div className="row my-5">
          <div className="col-sm-12 col-lg-9 col-left__divider order-lg-2">
            <div className="wrapper">
              <h3 className="news__title">{props.title}</h3>
              {props.children}
            </div>
          </div>

          <div className="col-sm-12 col-lg-3 order-lg-1">
            <div className="wrapper mb-5">
              <FAQSidebar categories={categories} />
            </div>
          </div>
        </div>
      </div>

      {/* <Contact /> */}
    </>
  );
}
