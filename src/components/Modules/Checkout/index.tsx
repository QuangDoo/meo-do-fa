/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CREATE_ORDER } from 'src/graphql/order/order.mutation';
import { GET_COUNSEL } from 'src/graphql/order/order.query';
import { GET_PAYMENT_DELIVERY } from 'src/graphql/paymentAndDelivery/paymentAndDelivery,query';

import Agreement from './Agreement';
import CustomerNotes from './CustomerNotes';
import DeliveryInfo from './DeliveryInfo';
import DeliveryOption from './DeliveryOption';
import PaymentOption from './PaymentOption';
import StickySidebar from './StickySidebar';

const CheckoutPage = (): JSX.Element => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      deliveryOption: '0',
      paymentOption: '1',
      saveInfo: true
    }
  });
  const {
    data: dataGetPaymentDelivery,
    loading: loadingGetPaymentDelivery,
    error: errorGetPaymentDelivery
  } = useQuery(GET_PAYMENT_DELIVERY);
  const { data: dataGetCounsel, loading: loadingGetCounsel, error: errorGetCounsel } = useQuery(
    GET_COUNSEL
  );
  const [
    createOrder,
    { data: dataCreateOrder, loading: loadingCreateOrder, error: errorCreateOrder }
  ] = useMutation(CREATE_ORDER);

  useEffect(() => {
    console.log('data payment: ', dataGetPaymentDelivery);
  }, [dataGetPaymentDelivery]);

  console.log('data counsel: ', dataGetCounsel);
  const onSubmit = (data) => {
    createOrder({
      variables: {
        orderNo: dataGetCounsel.getCounsel.counsel.orderNo,
        partnerId: 'String!',
        isNew: true,
        user: Boolean,
        zipCode: 'String',
        city: data.cityId,
        district: data.districtId,
        ward: data.wardId,
        street: data.address,
        fullName: data.name,
        phone: data.phone,
        shipping_address: {
          ward: data.wardId,
          street: data.address,
          partnerId: 'String!',
          isNew: true,
          city: data.cityId,
          district: data.districtId
        },
        email: data.email,
        paymentMethodId: Number(data.paymentOption),
        deliveryMethodId: Number(data.deliveryOption),
        note: data.customerNotes
      }
    });
  };
  if (loadingGetPaymentDelivery || loadingGetCounsel) {
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
              <DeliveryInfo ref={register} />
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
            <StickySidebar ref={register} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutPage;
