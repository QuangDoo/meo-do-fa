import { useLazyQuery, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useUserContext } from 'src/contexts/User';
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
import DeliveryOption from './DeliveryOption';
import PaymentOption from './PaymentOption';
import StickySidebar from './StickySidebar';

type FormInputs = {
  name: string;
  phone: string;
  email: string;
  address: string;
  cityId: string;
  districtId: string;
  wardId: string;
  deliveryOption: string;
  paymentOption: string;
  saveInfo: boolean;
  customerNotes: string;
  agreement: boolean;
};

const CheckoutPage = () => {
  const { t } = useTranslation(['checkout']);

  // Cities
  const { data: citiesData } = useQuery<GetCitiesData, undefined>(GET_CITIES);
  const cities = citiesData?.getCities || [];

  // Districts
  const [getDistricts, { data: districtsData }] = useLazyQuery<GetDistrictsData, GetDistrictsVars>(
    GET_DISTRICTS
  );
  const districts = districtsData?.getDistricts || [];

  // wards
  const [getWards, { data: wardsData }] = useLazyQuery<GetWardsData, GetWardsVars>(GET_WARDS);
  const wards = wardsData?.getWards || [];

  // Payment & Delivery options
  const { data: paymentAndDeliveryData } = useQuery<GetPaymentAndDeliveryData, undefined>(
    GET_PAYMENT_DELIVERY
  );
  const paymentMethods = paymentAndDeliveryData?.getPaymentAndDeliveryMethod.paymentMethods || [];
  const deliveryMethods = paymentAndDeliveryData?.getPaymentAndDeliveryMethod.deliveryMethods || [];

  // Counsel
  const { data: counselData } = useQueryAuth<GetCounselData, undefined>(GET_COUNSEL);

  // User
  const { user } = useUserContext();

  // Form handler with default values
  const { register, handleSubmit, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
      address: user?.street,
      // cityId: user?.city.id,
      // districtId: user?.district.id,
      // wardId: user?.ward.id,
      deliveryOption: '2',
      paymentOption: '2',
      saveInfo: true,
      customerNotes: '',
      agreement: false
    }
  });

  useEffect(() => {
    if (!user) return;

    setValue('name', user.name);
    setValue('phone', user.phone);
    setValue('address', user.street);
  }, [user]);

  const cityId = Number(watch('cityId'));

  const districtId = Number(watch('districtId'));

  useEffect(() => {
    getDistricts({
      variables: {
        city_id: cityId
      }
    });
  }, [cityId]);

  useEffect(() => {
    getWards({
      variables: {
        district_id: districtId
      }
    });
  }, [districtId]);

  const router = useRouter();

  const { refetchCart } = useCart();

  const [createOrder] = useMutationAuth<CreateOrderData, CreateOrderVars>(CREATE_ORDER, {
    onCompleted: (data) => {
      swal({
        // title: `Đơn hàng ${data.createOrder.orderNo} đã được đặt thành công!`,
        title: t('checkout:order_success_message', {
          orderNo: data.createOrder.orderNo
        }),
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

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
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
              zipCode: +data.wardId,
              city: cities.find((city) => city.id === +data.cityId).name,
              district: districts.find((district) => district.id === +data.districtId).name,
              ward: wards.find((ward) => ward.id === +data.wardId).name,
              street: data.address
            }
          },
          paymentMethodId: +data.paymentOption,
          deliveryMethodId: +data.deliveryOption,
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
            <h1 className="h3">{t('checkout:title')}</h1>
          </div>

          <div className="col-md-8">
            <div className="mb-4">
              <DeliveryInfo
                register={register}
                cities={cities}
                districts={districts}
                wards={wards}
              />
            </div>

            {/* <div className="mb-4">
              <DeliveryOption register={register} deliveryMethods={deliveryMethods} />
            </div> */}

            {/* Payment */}
            <div className="mb-4">
              <PaymentOption register={register} paymentMethods={paymentMethods} />
            </div>

            {/* Notes */}
            <div className="mb-4">
              <CustomerNotes register={register} />
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
