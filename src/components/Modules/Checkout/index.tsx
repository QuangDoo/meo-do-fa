import { useMutation, useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCities } from 'src/contexts/City';
import { GET_DISTRICT, GET_WARD, GET_WARD_DETAIL } from 'src/graphql/address/city.query';
import { CREATE_ORDER } from 'src/graphql/order/order.mutation';
import { GET_COUNSEL } from 'src/graphql/order/order.query';
import { GET_PAYMENT_DELIVERY } from 'src/graphql/paymentAndDelivery/paymentAndDelivery,query';
import swal from 'sweetalert';

import Agreement from './Agreement';
import CustomerNotes from './CustomerNotes';
import DeliveryInfo from './DeliveryInfo';
import DeliveryOption from './DeliveryOption';
import PaymentOption from './PaymentOption';
import StickySidebar from './StickySidebar';

const CheckoutPage = (): JSX.Element => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      deliveryOption: '0',
      paymentOption: '1',
      saveInfo: true
    }
  });
  const { data: dataCity } = useCities();
  const {
    data: dataGetPaymentDelivery,
    loading: loadingGetPaymentDelivery,
    error: errorGetPaymentDelivery
  } = useQuery(GET_PAYMENT_DELIVERY);
  const { data: dataGetCounsel, loading: loadingGetCounsel, error: errorGetCounsel } = useQuery(
    GET_COUNSEL
  );
  console.log('errorGetCounsel', errorGetCounsel);
  const router = useRouter();
  const [createOrder] = useMutation(CREATE_ORDER, {
    onCompleted: (data) => {
      console.log('data', data);
      swal({
        title: `Sản phẩm ${data.createOrder.orderNo} đã được đặt thành công!`,
        icon: 'success'
      }).then(function () {
        router.push('/');
      });
    },
    onError: () => {
      toast.error('Thanh toán thất bại');
    }
  });

  const city_id = Number(watch('cityId'));
  const district_id = Number(watch('districtId'));
  const ward_id = Number(watch('wardId'));

  const { data: dataDistrict } = useQuery(GET_DISTRICT, {
    variables: { city_id }
  });
  const { data: dataWards } = useQuery(GET_WARD, {
    variables: { district_id }
  });
  const { data: dataward } = useQuery(GET_WARD_DETAIL, {
    variables: { ward_id }
  });

  const onSubmit = (data) => {
    createOrder({
      variables: {
        orderNo: dataGetCounsel.getCounsel?.counsel.orderNo,
        partnerId: '',
        isNew: true,
        use: false,
        zipCode: '',
        city: dataward.getWard.city.name,
        district: dataward.getWard.district.name,
        ward: dataward.getWard.ward.name,
        street: data.address,
        fullName: data.name,
        phone: data.phone,
        shipping_address: {
          ward: dataward.getWard.ward.name,
          street: data.address,
          partnerId: '',
          isNew: true,
          city: dataward.getWard.city.name,
          district: dataward.getWard.district.name
        },
        email: data.email,
        paymentMethodId: Number(data.paymentOption),
        deliveryMethodId: Number(data.deliveryOption),
        note: data.customerNotes
      }
    });
  };
  if (loadingGetPaymentDelivery) {
    return <h1>LOADING...</h1>;
  }
  if (loadingGetCounsel) {
    return <h1>LOADING...</h1>;
  }
  return (
    <form className="checkout__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="checkout container py-5">
        <div className="row">
          <div className="col-12 mb-3">
            <h1 className="h3">Thanh toán</h1>
          </div>

          <div className="col-md-8">
            <div className="mb-4">
              <DeliveryInfo
                ref={register}
                dataCity={dataCity}
                dataDistrict={dataDistrict?.getDistricts}
                dataWard={dataWards?.getWards}
              />
            </div>

            <div className="mb-4">
              <DeliveryOption
                ref={register}
                deliveryMethods={
                  dataGetPaymentDelivery?.getPaymentAndDeliveryMethod.deliveryMethods
                }
              />
            </div>

            <div className="mb-4">
              <PaymentOption
                ref={register}
                paymentMethods={dataGetPaymentDelivery?.getPaymentAndDeliveryMethod.paymentMethods}
              />
            </div>

            <div className="mb-4">
              <CustomerNotes ref={register} />
            </div>

            <div className="form-group">
              <Agreement ref={register} />
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <StickySidebar ref={register} counsel={dataGetCounsel?.getCounsel} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutPage;
