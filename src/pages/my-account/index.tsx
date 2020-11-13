import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import PageLayout from 'src/components/Layout/PageLayout';
import ProfileSidebar from 'src/components/Modules/ProfileSidebar';


const MyAccount = (props): JSX.Element => {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
    // console.log('Product card data:', props)
  }
  const [fileName, setFileName] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const [disabledDistrict, setDisabledDistrict] = useState(true);
  const [disabledWard, setDisabledWard] = useState(true);
  const city = [
    {
      cityName: 'Chọn tỉnh/thành phố...',
      id: ''
    },
    {
      cityName: 'An Giang',
      id: 9131
    },
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
  ];
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <section className="py-5 order-list container">
        <div className="row">
          <ProfileSidebar />
            <div className="col-12 col-sm-9">
                <h1 className="h2 text-center mb-4 text-primary">Cập nhật hồ sơ</h1>
                <form encType="multipart/form-data" action="/my-account">
                <input type="hidden" name="_method" defaultValue="put" />
                <input type="hidden" name="authenticity_token" />
                <div className="row elevated mb-3">
                    <div className="col pt-3">
                        <h2 className="h4 text-center mb-3">Thông tin tài khoản</h2>
                        <div className="form-group">
                            <label className="form__label required" htmlFor="user_name">Họ Tên khách hàng</label>
                            <input className="form-control" placeholder="Trần Thị B" required type="text" value="Tường Vi" name="user[name]" id="user_name" />
                        </div>
                        <div className="form-group">
                            <label className="form__label required" htmlFor="user_name">Sô điện thoại</label>
                            <input className="form-control" placeholder="Trần Thị B" required type="text" value="0353148057" name="user[name]" id="user_name" />
                        </div>
                        <div className="form-group">
                            <label className="form__label " htmlFor="user_name">Email</label>
                            <input className="form-control" placeholder="Trần Thị B"  type="text" value="tranthib@gmail.com" name="user[name]" id="user_name" />
                        </div>
                        <div className="form-group">
                            <label className="form__label" htmlFor="user_password">Mật khẩu mới</label>
                            <div className="form__password" data-controller="password">
                                <input className="form-control" data-target="password.password" type="password" name="user[password]" id="user_password" />
                                <input type="checkbox" name="show_password" id="0.36532372843421346" value="0" className="form__password-checkbox" />
                                <label className="form__password-label" htmlFor="0.36532372843421346">
                                    <span className="form__password-label-show">
                                        <i className="fas fa-eye mr-1"></i>
                                    </span>
                                    <span className="form__password-label-hide">
                                        <i className="fas fa-eye-slash mr-1"></i>
                                    </span>
                                </label>
                            </div>
                            <small className="text-muted">Mật khẩu dài tối thiểu 6 ký tự</small>
                        </div>
                    </div>
                </div>
                <div className="row elevated mb-3">
                    <div className="col pt-3">
                        <h2 className="h4 text-center mb-3">Thông tin doanh nghiệp</h2>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <label className="form__label">Bạn là</label>
                                <div className="form-control d-block w-100">Nhà thuốc</div>
                            </div>
                            <div className="col-md-8 form-group">
                                <label className="form__label" htmlFor="user_businesses_attributes_0_name">Tên nhà thuốc/phòng khám</label>
                                <input className="form-control" placeholder="Dược Hoàng Vũ" type="text" value="nhà thuốc số 1" name="user[businesses_attributes][0][name]" id="user_businesses_attributes_0_name" />
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
                                    name="representative"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form__label" htmlFor="user_businesses_attributes_0_">
                                    Giấy phép kinh doanh phòng khám/nhà thuốc 
                                </label>
                                <div className="custom-file">
                                    <input
                                        className="custom-file-input"
                                        type="file"
                                        name="business_license"
                                        onChange={(event) => handleChange(event)}
                                    />
                                    <label className="custom-file-label" htmlFor="file">
                                    {file}</label>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h2 className="h4 text-center mb-3">Thông tin xuất hóa đơn</h2>
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
                                        name="vat"
                                        placeholder="8026906145"
                                    />
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
                                        name="user[businesses_attributes][0][ward_id]">
                                        {city?.map((item, index) => (
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
                                        required
                                        name="user[businesses_attributes][0][district_id]"
                                        >
                                        {district?.map((item, index) => (
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
                                        required
                                        name="user[businesses_attributes][0][ward_id]"
                                        >
                                        {ward?.map((item, index) => (
                                            <option key={index} value={item.id}>
                                            {item.wardName}
                                            </option>
                                        ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row elevated mb-3">
                    <div className="col pt-3">
                        <h2 className="h4 text-center mb-3">Thông tin giao hàng</h2>
                        <div className="form-group">
                            <label
                                className="form__label required"
                                htmlFor="user_businesses_attributes_0_address">
                                Địa chỉ giao hàng
                            </label>
                            <input
                                className="form-control"
                                aria-describedby="addressHelpBlock"
                                required
                                type="text"
                                name="contact_address"
                            />
                            <small className="form-text text-muted">
                                Nhập địa chỉ, đường phố. Rồi chọn tỉnh/thành phố, quận/huyện, phường/xã
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
                          name="city"
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
                            {city?.map((item, index) => (
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
                          name="district"
                          onBlur={(e) => {
                            e.target.value ? setDisabledWard(false) : setDisabledWard(true);
                          }}>
                            {district?.map((item, index) => (
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
                          >
                          {ward?.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.wardName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    </div>
                </div>
                
                <div className="col-12 d-flex justify-content-center">
                    <p>
                      <Link href="/quick-order">
                      <a className="btn btn-secondary btn-lg pr-4 pl-4" role="button">
                          Cập nhật
                      </a>
                      </Link>
                    </p>
                  </div>
                </form>
            </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default MyAccount;
