import React, { createRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import Head from '../../components/Layout/Head';
import PageLayout from '../../components/Layout/PageLayout';

function SignupBusiness(): JSX.Element {
  const [fileName, setFileName] = useState('');
  const handleChange = (e) => {
    switch (e.target.name) {
      // Updated this
      case 'selectedFile':
        if (e.target.files.length > 0) {
          // Accessed .name from file
          setFileName(e.target.files[0].name);
          // console.log(e.target.files[0].name)
        }
        break;
      default:
        setFileName(e.target.value);
    }
  };
  let file = null;
  file = fileName ? <span>File Selected - {fileName}</span> : <span>Chọn file...</span>;
  const city = [
    {
      cityName: 'Chọn tỉnh/thành phố...',
      id: ''
    },
    {
      cityName: 'An Giang',
      id: 9131
    },
    {
      cityName: 'TP Hồ Chí Minh',
      id: 1475
    },
    {
      cityName: 'Bắc Kạn',
      id: 9402
    },
    {
      cityName: 'Bạc Liêu',
      id: 9533
    }
  ];
  const district = [
    {
      districtName: 'Chọn quận/huyện...',
      id: ''
    },
    {
      districtName: 'Quận 1',
      id: 1476
    },
    {
      districtName: 'Quận 2',
      id: 1487
    },
    {
      districtName: 'Quận 3',
      id: 1499
    },
    {
      districtName: 'Quận 4',
      id: 1514
    }
  ];
  const ward = [
    {
      wardName: 'Chọn phường/xã...',
      id: 123
    },
    {
      wardName: 'Phường 2',
      id: 11234
    },
    {
      wardName: 'Phường 3',
      id: 12388
    },
    {
      wardName: 'Phường 4',
      id: 14523
    }
  ];

  const { register, setValue, handleSubmit } = useForm();
  const fileInput = createRef();
  const onSubmit = (data) => {
    console.log(data);
    console.log(fileInput.current);
  };
  const [disabledDistrict, setDisabledDistrict] = useState(true);
  const [disabledWard, setDisabledWard] = useState(true);
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <header className="bg-white header-nonav">
        <div className="container py-2">
          <div className="d-flex align-items-center justify-content-between">
            <div className="mr-3">
              <div className="buymed-logo">
                <a href="/" title="thuocsi.vn">
                  <img
                    alt="thuocsi.vn"
                    data-src="/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d.svg"
                    className="img-fluid lozad"
                    title="thuocsi.vn"
                    src="/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d.svg"
                    data-loaded="true"
                  />
                </a>
              </div>
            </div>
            <div className="support-phone d-flex align-items-center">
              <i className="fas fa-phone-square support-phone__icon text-primary mr-1" />
              <span>
                <a href="tel:02873008840">02 873 008 840</a>
                <br />
                <small>Từ T2 đến T6: 8:00 - 18:00</small>
              </span>
            </div>
          </div>
        </div>
      </header>
      {/* <Nav /> */}
      <PageLayout>
        <form
          encType="multipart/form-data"
          action="/signup_business"
          acceptCharset="UTF-8"
          method="post"
          onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="_method" defaultValue="put" />
          <input type="hidden" name="authenticity_token" />
          <div className="container signup-business py-3 py-sm-5">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-9 mb-3">
                <div className="row">
                  <div className="col-12 text-center mb-3">
                    <h1 className="h3 account-header">Thông tin nhà thuốc/phòng khám</h1>
                  </div>
                  <div className="col-12 mb-3 text-danger">
                    <i className="fas fa-exclamation-circle mr-1" />
                    Vui lòng điền đầy đủ thông tin để kích hoạt tài khoản nhanh hơn.
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-4 form-group">
                        <label htmlFor="ban" className="form__label">
                          Bạn là
                        </label>
                        <div className="form-control d-block w-100">Người tiêu dùng</div>
                      </div>
                      <div className="col-md-8 form-group">
                        <label className="form__label" htmlFor="user_businesses_attributes_0_name">
                          Tên nhà thuốc/phòng khám
                        </label>
                        <input
                          className="form-control"
                          aria-describedby="businessNameHelpBlock"
                          type="text"
                          name="user[businesses_attributes][0][name]"
                          ref={register}
                        />
                        <small className="form-text text-muted">Vd: Dược Hoàng Vũ</small>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        className="form__label"
                        htmlFor="user_businesses_attributes_0_representative">
                        Tên người đại diện pháp luật
                      </label>
                      <input
                        className="form-control"
                        aria-describedby="representativeHelpBlock"
                        type="text"
                        name="user[businesses_attributes][0][representative]"
                        ref={register}
                      />
                      <small className="form-text text-muted">Vd. Trần Thị B</small>
                    </div>
                    <div className="form-group">
                      <label
                        className="form__label"
                        htmlFor="user_businesses_attributes_0_tax_number">
                        Mã số thuế
                      </label>
                      <input
                        className="form-control no-spinner"
                        pattern="([\d]{10}|[\d]{10}-[\d]{3})"
                        maxLength={14}
                        aria-describedby="taxNumberHelpBlock"
                        size={14}
                        type="text"
                        name="user[businesses_attributes][0][tax_number]"
                        ref={register}
                      />
                      <small className="form-text text-muted">Vd. 8026906145</small>
                    </div>
                    <div className="form-group">
                      <label className="form__label" htmlFor="user_businesses_attributes_0_">
                        Giấy phép kinh doanh phòng khám/nhà thuốc (Không bắt buộc)
                      </label>
                      <div className="custom-file">
                        <input
                          className="custom-file-input"
                          type="file"
                          name="user[businesses_attributes][0][license_file]"
                          onChange={(event) => handleChange(event)}
                          ref={register}
                        />
                        <label className="custom-file-label" htmlFor="file">
                          {file}
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        className="form__label required"
                        htmlFor="user_businesses_attributes_0_address">
                        Địa chỉ nhà thuốc/phòng khám
                      </label>
                      <input
                        className="form-control"
                        aria-describedby="addressHelpBlock"
                        required
                        type="text"
                        name="user[businesses_attributes][0][address]"
                        ref={register}
                      />
                      <small className="form-text text-muted">
                        Vd. 11 Ngô Quyền, Tân Lợi, Tp. Buôn Ma Thuột, Đắk Lắk
                      </small>
                    </div>
                    <div className="row">
                      <div className="col-md-4 form-group">
                        <label
                          className="form__label required"
                          htmlFor="user_businesses_attributes_0_city_id">
                          Tỉnh/Thành phố
                        </label>
                        <select
                          className="custom-select d-block"
                          required
                          name="user[businesses_attributes][0][city_id]"
                          ref={register}
                          onBlur={(e) => {
                            e.target.value
                              ? setDisabledDistrict(false)
                              : (setDisabledDistrict(true),
                                setDisabledWard(true),
                                setValue(
                                  'user[businesses_attributes][0][district_id]',
                                  district[0].districtName
                                ));
                          }}>
                          {city.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.cityName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4 form-group">
                        <label
                          className="form__label required"
                          htmlFor="user_businesses_attributes_0_district_id">
                          Quận/Huyện
                        </label>
                        <select
                          className="custom-select d-block"
                          disabled={disabledDistrict}
                          required
                          name="user[businesses_attributes][0][district_id]"
                          ref={register}
                          onBlur={(e) => {
                            e.target.value ? setDisabledWard(false) : setDisabledWard(true);
                          }}>
                          {district.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.districtName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4 form-group">
                        <label
                          className="form__label required"
                          htmlFor="user_businesses_attributes_0_ward_id">
                          Phường/Xã
                        </label>
                        <select
                          className="custom-select d-block"
                          disabled={disabledWard}
                          required
                          name="user[businesses_attributes][0][ward_id]"
                          ref={register}>
                          {ward.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.wardName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  type="hidden"
                  defaultValue={40688}
                  name="user[businesses_attributes][0][id]"
                  id="user_businesses_attributes_0_id"
                />
              </div>
              <div className="col-12 col-sm-9">
                <button className="btn btn-gradient btn-block" type="submit">
                  Cập nhật thông tin
                </button>
              </div>
            </div>
          </div>
        </form>
        <input
          type="hidden"
          defaultValue='{"messages":[{"type":"notice","body":"Xin chào! Bạn đã đăng ký thành công."}]}'
        />
        <div id="resource" />
        <div id="modal-holder" />
        <div className=" fb_reset">
          <div style={{ position: 'absolute', top: '-10000px', width: '0px', height: '0px' }}>
            <div />
          </div>
        </div>
      </PageLayout>
      {/* <noscript>
          &lt;iframe height="0" src="https://www.googletagmanager.com/ns.html?id=GTM-TBKGGQF"
          style="display:none;visibility:hidden" width="0"&gt;&lt;/iframe&gt;
        </noscript> */}
      {/* <div className="iziToast-wrapper iziToast-wrapper-topRight" /> */}
      {/* <iframe
          id="insider-worker"
          src="https://thuocsivn.api.useinsider.com/worker-new.html"
          style={{ display: 'none' }}
        />
        <iframe
          data-product="web_widget"
          title="No content"
          tabIndex={-1}
          aria-hidden="true"
          src="about:blank"
          style={{
            width: '0px',
            height: '0px',
            border: '0px',
            position: 'absolute',
            top: '-9999px',
          }}
        />
        <div>
          <iframe
            title="Opens a widget where you can chat to one of our agents"
            id="launcher"
            tabIndex={0}
            style={{
              width: '108px',
              height: '50px',
              padding: '0px',
              margin: '10px 20px',
              position: 'fixed',
              bottom: '0px',
              overflow: 'visible',
              opacity: 1,
              border: '0px',
              zIndex: 999998,
              transitionDuration: '250ms',
              transitionTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
              transitionProperty: 'opacity, top, bottom',
              right: '0px',
            }}
          />
          <iframe
            title="Find more information here"
            id="webWidget"
            tabIndex={-1}
            style={{
              width: '374px',
              maxHeight: 'calc(100vh - 32px)',
              height: '572px',
              position: 'fixed',
              opacity: 0,
              border: '0px',
              transitionDuration: '250ms',
              transitionTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
              transitionProperty: 'opacity, top, bottom',
              top: '-9999px',
              visibility: 'hidden',
              zIndex: 999999,
            }}
          />
        </div>
        <style id="ins-free-style" innerhtml dangerouslySetInnerHTML={{ __html: '' }} /> */}
      {/* <Footer /> */}
    </>
  );
}

export default SignupBusiness;
