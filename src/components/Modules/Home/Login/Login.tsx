import { useTranslation } from 'i18n';
import React from 'react';
import { useModalControlDispatch } from 'src/contexts/ModalControl';

const Login = () => {
  const { openModal } = useModalControlDispatch();

  const { t } = useTranslation(['header']);

  return (
    <section className="home__cta">
      <div className="container-fluid py-5 home__cta-overlay">
        <div className="row text-center text-white">
          <div className="col-12">
            <h4 style={{ color: 'white' }}>{t('header:login_title')}</h4>
          </div>

          <div className="col-12">
            <button
              className="login btn btn-secondary home__cta-btn m-2"
              onClick={() => openModal('LOGIN')}>
              <i className="fas fa-sign-in-alt mr-1" />
              {t('header:login')}
            </button>

            <button
              className="register btn btn-primary home__cta-btn m-2"
              onClick={() => openModal('REGISTER')}>
              <i className="fas fa-user-md mr-1" />
              {t('header:register')}
            </button>

            {/* <a
              className="call btn btn-info home__cta-btn m-2 d-inline-block d-sm-none"
              href="tel:0866624702">
              <i className="fas fa-phone mr-1" />
              02 873 008 840
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
