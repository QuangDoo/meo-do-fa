import { Trans } from 'i18n';
import React from 'react';

export default function PromoCodes(props) {
  return (
    <div className="promo-codes py-5">
      <div className="container mb-3">
        <div className="row">
          <div className="col-12 mb-3">
            <h1>
              <Trans i18nKey="promoCodes:promo_codes" />
            </h1>
            <p>
              <Trans i18nKey="promoCodes:user_manual" />
            </p>
            <ol className="pl-5">
              <li>
                <span>
                  <Trans
                    i18nKey="promoCodes:order"
                    components={{
                      b: <b />,
                      a1: <a href="/asd">asd</a>,
                      a2: <a href="/asd">asdasd</a>
                    }}
                  />
                </span>
              </li>
              <li>
                <span>
                  <Trans
                    i18nKey="promoCodes:order_content"
                    components={{
                      a1: <a href="/asd">asd</a>,
                      a2: <a href="/asd">asdasd</a>
                    }}
                  />
                </span>
              </li>
              <li>
                <span>
                  <Trans
                    i18nKey="promoCodes:use_promocode"
                    components={{
                      b: <b />
                    }}
                  />
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="text-center">
              <Trans i18nKey="promoCodes:just_for_you" />
            </h2>
            <p>
              <Trans
                i18nKey="promoCodes:just_for_you_content"
                components={{
                  a1: <a href="/">Giới thiệu bạn bè</a>,
                  a2: <a href="/">Đổi điểm tích luỹ</a>
                }}
              />
            </p>
          </div>
        </div>
        <div className="row">{props.children}</div>
      </div>
    </div>
  );
}
