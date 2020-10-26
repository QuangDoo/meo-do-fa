import React from 'react'
import { emailRegex } from '../../assets/regex/email'
import { viPhoneNumberRegex } from '../../assets/regex/viPhoneNumber'
import Checkbox from '../Checkbox'
import InputCard from './InputCard'
import SelectWithLabel from './SelectWithLabel'
import InputWithLabel from './InputWithLabel'

const mockCities = [
  {
    id: 1,
    name: 'TP Hồ Chí Minh',
  },
  {
    id: 2,
    name: 'Hà Nội',
  },
  {
    id: 3,
    name: 'Đà Nẵng',
  },
  {
    id: 4,
    name: 'Bà Rịa - Vũng Tàu',
  },
]

const mockDistricts = [
  {
    id: 1,
    name: 'Quận 1',
  },
  {
    id: 2,
    name: 'Quận 10',
  },
  {
    id: 3,
    name: 'Quận 3',
  },
  {
    id: 4,
    name: 'Huyện Nhà Bè',
  },
]

const mockWards = [
  {
    id: 1,
    name: 'Phường 1',
  },
  {
    id: 2,
    name: 'Phường 2',
  },
  {
    id: 3,
    name: 'Phường 3',
  },
  {
    id: 4,
    name: 'Phường 4',
  },
]

const DeliveryInfo = (props, register) => {
  return (
    <InputCard title="Thông tin giao hàng" hasRequired>
      {/* Name input */}
      <InputWithLabel
        name="name"
        ref={register({
          required: 'Xin nhập họ tên.',
        })}
        label="Họ Tên khách hàng"
        type="text"
        labelClass="required"
        placeholder="Vd. Nguyễn Văn B"
      />

      <div className="row">
        {/* Phone input */}
        <InputWithLabel
          name="phone"
          ref={register({
            required: 'Xin nhập số điện thoại.',
            pattern: {
              value: viPhoneNumberRegex,
              message: 'Xin nhập số điện thoại hợp lệ.',
            },
          })}
          type="number"
          label="Số điện thoại"
          containerClass="col-sm-4"
          labelClass="required"
          placeholder="Vd. 0999123456"
        />

        {/* Email input */}
        <InputWithLabel
          name="email"
          ref={register({
            pattern: {
              value: emailRegex,
              message: 'Xin nhập email hợp lệ',
            },
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
          required: 'Xin nhập địa chỉ giao hàng.',
        })}
        label="Địa chỉ giao hàng"
        type="text"
        instructions="Nhập địa chỉ, tên đường. Rồi chọn tỉnh/thành phố, phường/xã, quận/huyện"
        labelClass="required"
      />

      <div className="row">
        {/* Select city */}
        <SelectWithLabel
          name="cityId"
          ref={register({
            required: 'Xin chọn tỉnh/thành phố.',
          })}
          label="Tỉnh/Thành phố"
          labelClass="required"
          containerClass="col-md-4"
        >
          <option value="">Chọn tỉnh/thành phố...</option>

          {/* Map cities from api */}
          {mockCities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </SelectWithLabel>

        {/* Select district */}
        <SelectWithLabel
          name="districtId"
          ref={register({
            required: 'Xin chọn quận/huyện.',
          })}
          label="Quận/Huyện"
          labelClass="required"
          containerClass="col-md-4"
        >
          <option value="">Chọn quận/huyện...</option>

          {/* Map districts from chosen city */}
          {mockDistricts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </SelectWithLabel>

        {/* Select ward */}
        <SelectWithLabel
          name="wardId"
          ref={register({
            required: 'Xin chọn phường/xã.',
          })}
          label="Phường/Xã"
          labelClass="required"
          containerClass="col-md-4"
        >
          <option value="">Chọn phường/xã...</option>

          {/* Map wards from chosen district */}
          {mockWards.map((ward) => (
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
  )
}

export default React.forwardRef(DeliveryInfo)
