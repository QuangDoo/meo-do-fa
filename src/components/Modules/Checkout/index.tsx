import { useLazyQuery, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { GET_CITIES, GetCitiesData } from 'src/graphql/address/getCities';
import {
  GET_DISTRICTS,
  GetDistrictsData,
  GetDistrictsVars
} from 'src/graphql/address/getDistricts';
import { GET_WARDS, GetWardsData, GetWardsVars } from 'src/graphql/address/getWards';
import { CREATE_ORDER, CreateOrderData, CreateOrderVars } from 'src/graphql/order/createOrder';
import { GET_COUNSEL, GetCounselData } from 'src/graphql/order/getCounsel';
import {
  GET_PAYMENT_DELIVERY,
  GetPaymentAndDeliveryData
} from 'src/graphql/paymentAndDelivery/paymentAndDelivery,query';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';
import swal from 'sweetalert';

import Agreement from './Agreement';
import CustomerNotes from './CustomerNotes';
import DeliveryInfo from './DeliveryInfo';
import PaymentOption from './PaymentOption';
import StickySidebar from './StickySidebar';

type DescriptionBoxProps = {
  children: React.ReactNode;
  white?: boolean;
};

const DescriptionBox = (props: DescriptionBoxProps) => {
  return (
    <div
      className={clsx('checkout__description mt-2', props.white && 'checkout__description--white')}>
      {props.children}
    </div>
  );
};

type InputCardProps = {
  children: React.ReactNode;
  title: string;
  titleChildren?: React.ReactNode;
  hasRequired?: boolean;
  description?: string;
};

const InputCard = (props: InputCardProps) => {
  return (
    <div className="elevated p-3 p-md-4">
      <div
        className={clsx('mb-4', props.hasRequired && 'd-flex justify-content-between flex-wrap')}>
        <h2 className="h6">{props.title}</h2>

        {props.hasRequired && (
          <small className="text-muted font-italic">
            <i className="fas fa-exclamation-circle mr-1"></i>
            Lưu ý: những ô có dấu <span className="required"></span> là thông tin bắt buộc
          </small>
        )}

        {props.description && (
          <small className="text-muted mb-2 d-inline-block">
            Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên dưới.
            Chúng tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có thể.
          </small>
        )}
      </div>

      {props.children}
    </div>
  );
};

const CheckoutPage = () => {
  const { t } = useTranslation(['checkout']);

  const { data: citiesData } = useQuery<GetCitiesData, undefined>(GET_CITIES);
  const cities = citiesData?.getCities || [];

  const [getDistricts, { data: districtsData }] = useLazyQuery<GetDistrictsData, GetDistrictsVars>(
    GET_DISTRICTS
  );
  const districts = districtsData?.getDistricts || [];

  const [getWards, { data: wardsData }] = useLazyQuery<GetWardsData, GetWardsVars>(GET_WARDS);
  const wards = wardsData?.getWards || [];

  const { data: paymentAndDeliveryData } = useQuery<GetPaymentAndDeliveryData, undefined>(
    GET_PAYMENT_DELIVERY
  );
  const paymentMethods = paymentAndDeliveryData?.getPaymentAndDeliveryMethod.paymentMethods || [];
  const deliveryMethods = paymentAndDeliveryData?.getPaymentAndDeliveryMethod.deliveryMethods || [];

  const { data: counselData } = useQueryAuth<GetCounselData, undefined>(GET_COUNSEL);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      deliveryOption: 2,
      paymentOption: 1,
      saveInfo: true
    }
  });

  const cityId = Number(watch('cityId'));

  const districtId = Number(watch('districtId'));

  const wardId = Number(watch('wardId'));

  const router = useRouter();

  const { refetchCart } = useCart();

  const [createOrder] = useMutationAuth<CreateOrderData, CreateOrderVars>(CREATE_ORDER, {
    onCompleted: (data) => {
      swal({
        title: `Đơn hàng ${data.createOrder.orderNo} đã được đặt thành công!`,
        icon: 'success'
      }).then(() => {
        refetchCart();
        router.push('/');
      });
    },
    onError: (error) => {
      toast.error('Thanh toán thất bại.');
    }
  });

  const onSubmit = (data) => {
    createOrder({
      variables: {
        inputs: {
          orderNo: counselData?.getCounsel.counsel.orderNo,
          customer: {
            fullName: data.name,
            phone: data.phone,
            email: data.email,
            shipping_address: {
              partnerId: '',
              isNew: true,
              zipCode: wardId,
              city: cities.find((city) => city.id === cityId).name,
              district: districts.find((district) => district.id === districtId).name,
              ward: wards.find((ward) => ward.id === wardId).name,
              street: data.address
            }
          },
          paymentMethodId: 0,
          deliveryMethodId: 1,
          note: data.customerNotes,
          isInvoice: false
        }
      }
    });
  };

  const onError = (errors) => {
    const fields = Object.keys(errors);

    toast.error(errors[fields[0]].message);
  };

  return (
    <form className="checkout__form" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="checkout container py-5">
        <div className="row">
          <div className="col-12 mb-3">
            <h1 className="h3">Thanh toán</h1>
          </div>

          <div className="col-md-8">
            <div className="mb-4">
              <DeliveryInfo
                ref={register}
                dataCity={citiesData?.getCities}
                dataDistrict={districtsData?.getDistricts}
                dataWard={wardsData?.getWards}
              />
            </div>

            {/* <div className="mb-4">
              <DeliveryOption
                ref={register}
                deliveryMethods={
                  deliveryMethods
                }
              />
            </div> */}

            {/* Payment */}
            <div className="mb-4">
              <PaymentOption register={register} paymentMethods={paymentMethods} />
            </div>

            {/* Notes */}
            <div className="mb-4">
              <CustomerNotes ref={register} />
            </div>

            {/* Agreement */}
            <div className="form-group">
              <Agreement register={register} />
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <StickySidebar register={register} counselData={counselData} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutPage;
