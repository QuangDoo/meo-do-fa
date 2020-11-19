import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { emailRegex } from 'src/assets/regex/email';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import Checkbox from 'src/components/Form/Checkbox';
import { GET_USER } from 'src/graphql/user/getUser.mutation';

import InputCard from './InputCard';
import InputWithLabel from './InputWithLabel';
import SelectWithLabel from './SelectWithLabel';

type DataCityType = {
  id: number;
  name: string;
};

const DeliveryInfo = (props, register): JSX.Element => {
  const { data, error } = useQuery(GET_USER);

  return (
    <InputCard title="Thông tin giao hàng" hasRequired>
      {/* Name input */}
      <InputWithLabel
        name="name"
        defaultValue={data?.getUser.display_name}
        ref={register({
          required: 'Xin nhập họ tên.'
        })}
        label="Họ Tên khách hàng"
        type="text"
        placeholder="Vd. Nguyễn Văn B"
        required
      />

      <div className="row">
        {/* Phone input */}
        <InputWithLabel
          name="phone"
          defaultValue={data?.getUser.phone}
          ref={register({
            required: 'Xin nhập số điện thoại.',
            pattern: {
              value: viPhoneNumberRegex,
              message: 'Xin nhập số điện thoại hợp lệ.'
            }
          })}
          type="number"
          label="Số điện thoại"
          containerClass="col-sm-4"
          placeholder="Vd. 0999123456"
          required
        />

        {/* Email input */}
        <InputWithLabel
          name="email"
          defaultValue={data?.getUser.email}
          ref={register({
            pattern: {
              value: emailRegex,
              message: 'Xin nhập email hợp lệ'
            }
          })}
          type="text"
          label="Email"
          containerClass="col-sm-8"
          placeholder="Vd. nguyenvanb@gmail.com"
        />
      </div>

      {/* Address input */}
      <InputWithLabel
        name="address"
        ref={register({
          required: 'Xin nhập địa chỉ giao hàng. '
        })}
        label={
          <>
            Địa chỉ giao hàng{' '}
            <span className="text-muted">
              (Nhập địa chỉ, tên đường. Rồi chọn tỉnh/thành phố, phường/xã, quận/huyện)
            </span>
          </>
        }
        type="text"
        required
      />

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
          {props.dataCity.map((city: DataCityType) => (
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
          {props.dataDistrict?.map((district) => (
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
          {props.dataWard?.map((ward) => (
            <option key={ward.id} value={ward.id}>
              {ward.name}
            </option>
          ))}
        </SelectWithLabel>
      </div>

      {/* Save info for next time */}
      <Checkbox
        ref={register}
        name="saveInfo"
        containerClass="mt-2"
        label="Lưu thông tin cho lần sau"
        labelClass="form__label"
      />
    </InputCard>
  );
};

export default React.forwardRef(DeliveryInfo);
