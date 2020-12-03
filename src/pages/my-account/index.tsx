import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import FormCard from 'src/components/Modules/MyAccount/FormCard';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import ProfileSidebar from 'src/components/Modules/ProfileSidebar';
import { useUserContext } from 'src/contexts/User';
import { GET_CITIES, GetCitiesData } from 'src/graphql/address/getCities';
import useAddress from 'src/hooks/useAddress';
import useLocalStorage from 'src/hooks/useLocalStorage';
import useUser from 'src/hooks/useUser';

import withApollo from '../../utils/withApollo';

type Inputs = {
  name: string;
  display_name: string;
  email: string;
  contact_address: string;
  company_name: string;
  vat: string;
  representative: string;
  business_license: string;
  district_name: string;
};

const MyAccount = (): JSX.Element => {
  const { t } = useTranslation('account');

  const { register, handleSubmit, watch } = useForm<Inputs>();

  const { cities, districts, wards } = useAddress({
    cityId: +watch('cityId'),
    districtId: +watch('districtId')
  });

  const onSubmit = handleSubmit((data) => {
    console.log('submit data:', data);
  });

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <ProfileLayout title={t('account:update_profile')}>
        <form onSubmit={onSubmit}>
          <FormCard title={t('account_infomation')}>
            <InputWithLabel
              ref={register({
                required: 'Xin nhập họ tên'
              })}
              required
              label={t('account:fullname') + ''}
              name="name"
              type="text"
              placeholder="Trần Thị B"
            />

            {/* <div className="form-group">
              <label className="form__label required" htmlFor="user_name">
                {t('account:fullname')}
              </label>

              <input
                className="form-control"
                placeholder="Trần Thị B"
                required
                type="text"
                value="Tường Vi"
                name="user[name]"
                id="user_name"
              />
            </div> */}
            <div className="form-group">
              <label className="form__label required" htmlFor="user_name">
                {t('account:mobile_number')}
              </label>
              <input
                className="form-control"
                placeholder="Trần Thị B"
                required
                type="text"
                value="0353148057"
                name="user[name]"
                id="user_name"
              />
            </div>
            <div className="form-group">
              <label className="form__label " htmlFor="user_name">
                {t('account:email')}
              </label>
              <input
                className="form-control"
                placeholder="Trần Thị B"
                type="text"
                value="tranthib@gmail.com"
                name="user[name]"
                id="user_name"
              />
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="user_password">
                {t('account:new_password')}
              </label>
              <div className="form__password" data-controller="password">
                <input
                  className="form-control"
                  data-target="password.password"
                  type="password"
                  name="user[password]"
                  id="user_password"
                />
                <input
                  type="checkbox"
                  name="show_password"
                  id="0.36532372843421346"
                  value="0"
                  className="form__password-checkbox"
                />
                <label className="form__password-label" htmlFor="0.36532372843421346">
                  <span className="form__password-label-show">
                    <i className="fas fa-eye mr-1"></i>
                  </span>
                  <span className="form__password-label-hide">
                    <i className="fas fa-eye-slash mr-1"></i>
                  </span>
                </label>
              </div>
              <small className="text-muted">{t('account:password_at_least')}</small>
            </div>
          </FormCard>
          <div className="row elevated mb-3">
            <div className="col pt-3">
              <h2 className="h4 text-center mb-3">{t('account:business_information')}</h2>
              <div className="row">
                <div className="col-md-4 form-group">
                  <label htmlFor="ban" className="form__label">
                    {t('account:you_are')}
                  </label>
                  <div className="form-control d-block w-100">{t('account:comsumer')}</div>
                </div>
                <div className="col-md-8 form-group">
                  <label className="form__label" htmlFor="user_businesses_attributes_0_name">
                    {t('account:pharmacy_clinic_name')}
                  </label>
                  <input
                    className="form-control"
                    placeholder="Dược Hoàng Vũ"
                    type="text"
                    value={t('account:pharmacy_name_example') as string}
                    name="user[businesses_attributes][0][name]"
                    id="user_businesses_attributes_0_name"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="form__label"
                  htmlFor="user_businesses_attributes_0_representative">
                  {t('account:legal_representative_name')}
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
                  {t('account:business_license')}
                </label>
                <div className="custom-file">
                  <input
                    className="custom-file-input"
                    type="file"
                    name="business_license"
                    // onChange={(event) => handleChange(event)}
                  />
                  <label className="custom-file-label" htmlFor="file">
                    {/* {file} */}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="row elevated mb-3">
            <div className="col pt-3">
              <h2 className="h4 text-center mb-3">{t('account:invoice_information')}</h2>
              <div className="form-group">
                <label className="form__label" htmlFor="user_businesses_attributes_0_tax_number">
                  {t('account:tax_code')}
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
                    {t('account:province_city')}
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
                    {t('account:district')}
                  </label>
                  <select
                    className="custom-select d-block"
                    required
                    name="user[businesses_attributes][0][district_id]">
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
                    {t('account:ward')}
                  </label>
                  <select
                    className="custom-select d-block"
                    required
                    name="user[businesses_attributes][0][ward_id]">
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

          <div className="row elevated mb-3">
            <div className="col pt-3">
              <h2 className="h4 text-center mb-3">{t('account:delivery_information')}</h2>
              <div className="form-group">
                <label
                  className="form__label required"
                  htmlFor="user_businesses_attributes_0_address">
                  {t('account:delivery_addess')}
                </label>
                <input
                  className="form-control"
                  aria-describedby="addressHelpBlock"
                  required
                  type="text"
                  name="contact_address"
                />
                <small className="form-text text-muted">{t('account:address_guide')}</small>
              </div>
              <div className="row">
                <div className="col-md-4 form-group">
                  <label
                    className="form__label required"
                    htmlFor="user_businesses_attributes_0_city_id">
                    {t('account:province_city')}
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
                          setValue('district_name', district[0].districtName));
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
                    {t('account:district')}
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
                    {t('account:ward')}
                  </label>
                  <select
                    className="custom-select d-block"
                    disabled={disabledWard}
                    required
                    name="user[businesses_attributes][0][ward_id]">
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
              <Link href="/">
                <a className="btn btn-secondary btn-lg pr-4 pl-4" role="button">
                  {t('account:update')}
                </a>
              </Link>
            </p>
          </div>
        </form>
      </ProfileLayout>

      <Footer />
    </>
  );
};

MyAccount.getInitialProps = async () => ({
  namespacesRequired: ['account']
});

export default withApollo({ ssr: true })(MyAccount);
