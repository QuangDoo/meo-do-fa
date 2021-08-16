import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';
import { useNotify } from 'src/contexts/Notify';
import { useUser } from 'src/contexts/User';
import { CREATE_ORDER, CreateOrderData, CreateOrderVars } from 'src/graphql/order/createOrder';
import { GET_COUNSEL, GetCounselData, OutputCounsel } from 'src/graphql/order/getCounsel';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';
import swal from 'sweetalert';

import Agreement from './Agreement';
import CustomerNotes from './CustomerNotes';
import DeliveryInfo from './DeliveryInfo';
import InvoiceInfo from './InvoiceInfo';
import InvoiceProducts from './InvoiceProducts';
import PaymentOption from './PaymentOption';
import PromoCodes from './PromoCodes';
import StickySidebar from './StickySidebar';

export type CheckoutFormInputs = {
  deliveryName: string;
  deliveryPhone: string;
  deliveryEmail: string;
  deliveryStreet: string;
  deliveryCity: string; // format: name__id
  deliveryDistrict: string; // format: name__id
  deliveryWard: string; // format: name__id
  deliveryPartnerId: string;

  deliveryMethodId: string;
  paymentMethodId: string;

  isInvoice: boolean;
  showInvoiceProducts: boolean;
  invoiceName: string;
  invoiceEmail: string;
  invoiceStreet: string;
  invoiceCity: string; // format: name__id
  invoiceDistrict: string; // format: name__id
  invoiceWard: string; // format: name__id
  invoiceTaxCode: string;

  customerNotes: string;
  agreement: boolean;
};

const CheckoutPage = () => {
  const { t } = useTranslation(['checkout', 'errors']);

  const { setCheckedCartIDs } = useCart();

  const { data: user } = useUser();

  // Form handler with default values
  const methods = useForm<CheckoutFormInputs>({
    defaultValues: {
      deliveryName: '',
      deliveryPhone: '',
      deliveryEmail: '',
      deliveryStreet: '',
      deliveryCity: '',
      deliveryDistrict: '',
      deliveryWard: '',
      deliveryPartnerId: '',

      deliveryMethodId: '0',
      paymentMethodId: '1',

      isInvoice: false,
      showInvoiceProducts: false,
      invoiceName: '',
      invoiceEmail: '',
      invoiceStreet: '',
      invoiceCity: '',
      invoiceDistrict: '',
      invoiceWard: '',
      invoiceTaxCode: '',

      customerNotes: '',
      agreement: false
    }
  });

  const { register, handleSubmit, setValue } = methods;

  const [counselData, setCounselData] = useState<OutputCounsel>();

  // Counsel
  const { loading: loadingCounsel } = useQueryAuth<GetCounselData, undefined>(GET_COUNSEL, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setCounselData(data.getCounsel);
      if (data.getCounsel?.totalDcPayment > 0) {
        setValue('paymentMethodId', '2');
      }
    },
    onError: (err) => {
      const errorCode = err.graphQLErrors?.[0]?.extensions?.code;
      toast.error(t(`errors:code_${errorCode}`));

      if (errorCode === 114) {
        router.push('/cart');
      }
    }
  });

  const orderNo = counselData?.counsel?.orderNo;

  const router = useRouter();

  const { cart, getCart } = useCart();

  const { refetch: refetchNoti } = useNotify();

  const [createOrder, { loading: creatingOrder }] = useMutationAuth<
    CreateOrderData,
    CreateOrderVars
  >(CREATE_ORDER, {
    onCompleted: (data) => {
      getCart()
        .then(() =>
          swal({
            title: t('checkout:order_success_message', {
              orderNo: data.createOrder.orderNo
            }),
            icon: 'success'
          })
        )
        .then(() => router.push('/'))
        .then(() => setCheckedCartIDs([]));

      refetchNoti();
    },
    onError: (err) => {
      const errorCode = err.graphQLErrors[0]?.extensions?.code;
      toast.error(t(`errors:code_${errorCode}`));

      if (errorCode === 114) {
        router.push('/cart');
      }
    }
  });

  const onSubmit: SubmitHandler<CheckoutFormInputs> = (data) => {
    const [deliveryCityName, deliveryCityID] = data.deliveryCity?.split('__') || [];
    const [deliveryDistrictName, deliveryDistrictID] = data.deliveryDistrict?.split('__') || [];
    const [deliveryWardName, deliveryWardID] = data.deliveryWard?.split('__') || [];

    const [invoiceCityName, invoiceCityID] = data.invoiceCity?.split('__') || [];
    const [invoiceDistrictName, invoiceDistrictID] = data.invoiceDistrict?.split('__') || [];
    const [invoiceWardName, invoiceWardID] = data.invoiceWard?.split('__') || [];

    createOrder({
      variables: {
        inputs: {
          orderNo: orderNo,
          customer: {
            fullName: user.name || '',
            phone: user.phone || '',
            email: user.email || undefined,
            shipping_address: {
              fullName: data.deliveryName,
              phone: data.deliveryPhone,
              email: data.deliveryEmail,
              partnerId: +data.deliveryPartnerId || undefined,
              isNew: !data.deliveryPartnerId,
              zipCode: +deliveryWardID || 0,
              city: deliveryCityName || '',
              city_id: +(deliveryCityID || 0),
              district: deliveryDistrictName || '',
              district_id: +(deliveryDistrictID || 0),
              ward: deliveryWardName || '',
              ward_id: +(deliveryWardID || 0),
              street: data.deliveryStreet || ''
            },
            billing_address: data.isInvoice
              ? {
                  fullName: data.invoiceName,
                  email: data.invoiceEmail,
                  tax: data.invoiceTaxCode,
                  partnerId: 0,
                  isNew: true,
                  zipCode: +invoiceWardID || 0,
                  city: invoiceCityName || '',
                  city_id: +(invoiceCityID || 0),
                  district: invoiceDistrictName || '',
                  district_id: +(invoiceDistrictID || 0),
                  ward: invoiceWardName || '',
                  ward_id: +(invoiceWardID || 0),
                  street: data.invoiceStreet || ''
                }
              : {
                  fullName: user.name,
                  email: user.email || '',
                  tax: user.vat,
                  partnerId: user.id,
                  isNew: false,
                  zipCode: +user.contact_address?.ward.id || 0,
                  city: user.contact_address?.city.name || '',
                  city_id: user.contact_address?.city.id || 0,
                  district: user.contact_address?.district.name || '',
                  district_id: user.contact_address?.district.id || 0,
                  ward: user.contact_address?.ward.name || '',
                  ward_id: user.contact_address?.ward.id || 0,
                  street: user.contact_address?.street || ''
                }
          },
          paymentMethodId: +data.paymentMethodId,
          deliveryMethodId: +data.deliveryMethodId || 0,
          note: data.customerNotes,
          isInvoice: data.isInvoice || false
        }
      }
    });
  };

  const onError = (errors) => {
    toast.error(errors[Object.keys(errors)[0]].message);
  };

  if (counselData === null) {
    router.push('/');
    return null;
  }

  if (loadingCounsel) {
    return <LoadingBackdrop open={true} />;
  }

  return (
    <FormProvider {...methods}>
      <form className="checkout__form" onSubmit={handleSubmit(onSubmit, onError)}>
        <input hidden ref={register} name="deliveryPartnerId" />

        <div className="checkout container py-5">
          <div className="row">
            <div className="col-lg-8">
              <div className="mb-4">
                <DeliveryInfo />
              </div>

              {/* Payment */}
              <div className="mb-4">
                <PaymentOption orderNo={orderNo} setCounselData={setCounselData} />
              </div>

              {/* Notes */}
              <div className="mb-4">
                <CustomerNotes />
              </div>

              {/* Invoice */}
              {cart?.carts.some((cart) => cart.product.is_quick_invoice) && (
                <>
                  <div className="mb-4">
                    <InvoiceInfo />
                  </div>

                  <div className="mb-4">
                    <InvoiceProducts orderNo={orderNo} />
                  </div>
                </>
              )}

              {/* Agreement */}
              <div className="form-group">
                <Agreement register={register} />
              </div>
            </div>

            <div className="col-lg-4 mb-3">
              <PromoCodes counselData={counselData} setCounselData={setCounselData} />

              <StickySidebar counselData={counselData} />
            </div>
          </div>
        </div>

        <LoadingBackdrop open={creatingOrder || loadingCounsel} />
      </form>
    </FormProvider>
  );
};

export default CheckoutPage;
