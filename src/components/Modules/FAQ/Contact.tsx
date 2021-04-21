import React from 'react';

import ContactCardView from '../../Layout/Card/ContactCardView';

function Contact() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="wrapper border-top pt-3 w-100">
          <div className="news__title text-center pt-3 pb-3">{`Bạn có câu hỏi nào khác không?`}</div>
          <div className="post-item__content-divider"></div>

          <div className="help-center">
            <ContactCardView
              iconClass={`far fa-envelope bg-primary footer__icon mr-2`}
              title={`Email`}
              text={`Gửi câu hỏi của bạn!`}
            />

            <ContactCardView
              iconClass={`fas fa-phone-volume bg-primary footer__icon mr-2`}
              title={`Điện thoại`}
              text={`Gọi 0316560590 ngay!`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
