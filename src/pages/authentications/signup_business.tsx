import { useMutation, useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Head from 'src/components/Layout/Head';
import PageLayout from 'src/components/Layout/PageLayout';
import SelectWithLabel from 'src/components/Modules/Checkout/SelectWithLabel';
import { useCities } from 'src/contexts/Cities';
import { City, GET_DISTRICT, GET_WARD, GET_WARD_DETAIL } from 'src/graphql/address/city.query';
import { UPDATE_USER } from 'src/graphql/user/updateUser.mutation';
import { Status } from 'src/types/Status';
import withApollo from 'src/utils/withApollo';

type DataAddress = {
  city: string;
  district: string;
  ward: string;
};
type DataUpdateUser = {
  updateUser: Status;
};

function SignupBusiness(): JSX.Element {
  const [fileName, setFileName] = useState('');

  const [dataAddress, setDataAddress] = useState<DataAddress>();

  const [fileBase64, setFileBase64] = useState('');

  const router = useRouter();

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      if (data.updateUser.status === 'OK') {
        router.push('/');
      }
    },
    onError: (error) => {
      console.log('error', JSON.stringify(error.message));
    }
  });

  const { data: dataCity } = useCities();

  // const { data: dataDistrict, error: errorDistrict, refetch: refetchDistrict } = useQuery(
  //   GET_DISTRICT
  // );
  // const { data: dataWard, error: errorWard, refetch: refetchWard } = useQuery(GET_WARD);

  const handleChange = async (e) => {
    setFileName(e.target.files[0].name);
    getBase64(e.target.files[0]).then((result: string) => setFileBase64(result));
  };

  let file = null;
  file = fileName ? <span>File Selected - {fileName}</span> : <span>Chọn file...</span>;

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const { register, handleSubmit, watch } = useForm();

  const city_id = Number(watch('cityId'));
  const district_id = Number(watch('districtId'));
  const ward_id = Number(watch('wardId'));

  const { data: dataDistrict, error: errorDistrict } = useQuery(GET_DISTRICT, {
    variables: { city_id }
  });

  const { data: dataWards } = useQuery(GET_WARD, {
    variables: { district_id }
  });

  const { data: dataward } = useQuery(GET_WARD_DETAIL, {
    variables: { ward_id }
  });

  const onSubmit = (data) => {
    updateUser({
      variables: {
        display_name: data.user.businesses_attributes[0].name,
        representative: data.user.businesses_attributes[0].representative,
        vat: data.user.businesses_attributes[0].tax_number,
        street: data.user.businesses_attributes[0].address,
        city: dataward.getWard.city.name,
        district: dataward.getWard.district.name,
        ward: dataward.getWard.ward.name,
        business_license: fileBase64.substr(22)
      }
    });
  };
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <header className="bg-white header-nonav">
        <div className="container py-2">
          <div className="d-flex align-items-center justify-content-between">
            <div className="mr-3">
              <div className="rockland-logo">
                <a href="/" title="medofa.vn">
                  <img
                    alt="medofa.vn"
                    data-src="/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d.svg"
                    className="img-fluid lozad"
                    title="medofa.vn"
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
                      {/* Select city */}
                      <SelectWithLabel
                        name="cityId"
                        ref={register({
                          required: 'Xin chọn tỉnh/thành phố.'
                        })}
                        label="Tỉnh/Thành phố"
                        containerClass="col-md-4"
                        required>
                        <option value="">Chọn tỉnh/thành phố...</option>

                        {/* Map cities from api */}
                        {dataCity.map((city: City) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </SelectWithLabel>

                      {/* Select district */}
                      <SelectWithLabel
                        name="districtId"
                        ref={register({
                          required: 'Xin chọn quận/huyện.'
                        })}
                        label="Quận/Huyện"
                        labelClass="required"
                        containerClass="col-md-4">
                        <option value="">Chọn quận/huyện...</option>

                        {/* Map districts from chosen city */}
                        {dataDistrict?.getDistricts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </SelectWithLabel>

                      {/* Select ward */}
                      <SelectWithLabel
                        name="wardId"
                        ref={register({
                          required: 'Xin chọn phường/xã.'
                        })}
                        label="Phường/Xã"
                        labelClass="required"
                        containerClass="col-md-4">
                        <option value="">Chọn phường/xã...</option>

                        {/* Map wards from chosen district */}
                        {dataWards?.getWards.map((ward) => (
                          <option key={ward.id} value={ward.id}>
                            {ward.name}
                          </option>
                        ))}
                      </SelectWithLabel>
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
    </>
  );
}

export default withApollo({ ssr: true })(SignupBusiness);
