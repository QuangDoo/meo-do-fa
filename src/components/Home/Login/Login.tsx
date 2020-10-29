import React from 'react';

const Login = () => {
  return (
    <section className="home__cta">
      <div className="container-fluid py-5 home__cta-overlay">
        <div className="row text-center text-white">
          <div className="col-12">
            <h4 style={{ color: 'white' }}>Đăng nhập để tìm hiểu sản phẩm</h4>
          </div>
          <div className="col-12">
            <a
              className="login btn btn-secondary home__cta-btn m-2"
              href="https://thuocsi.vn/authentications/login">
              <i className="fas fa-sign-in-alt mr-1" />
              Đăng nhập
            </a>
            <a
              className="register btn btn-primary home__cta-btn m-2"
              href="https://thuocsi.vn/authentications/signup">
              <i className="fas fa-user-md mr-1" />
              Tạo tài khoản
            </a>
            <button className="btn btn-info home__cta-btn m-2">
              <i className="fas fa-eye mr-1" />
              Dùng Thử
            </button>
            <a
              className="call btn btn-info home__cta-btn m-2 d-inline-block d-sm-none"
              href="tel:02873008840">
              <i className="fas fa-phone mr-1" />
              02 873 008 840
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
