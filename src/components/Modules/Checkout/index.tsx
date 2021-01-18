import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';
import { useUser } from 'src/contexts/User';
import { CREATE_ORDER, CreateOrderData, CreateOrderVars } from 'src/graphql/order/createOrder';
import { GET_COUNSEL, GetCounselData, OutputCounsel } from 'src/graphql/order/getCounsel';
import { useLazyQueryAuth, useMutationAuth } from 'src/hooks/useApolloHookAuth';
import swal from 'sweetalert';

import Agreement from './Agreement';
import CustomerNotes from './CustomerNotes';
import DeliveryInfo from './DeliveryInfo';
import InvoiceInfo from './InvoiceInfo';
import InvoiceProducts from './InvoiceProducts';
import PaymentOption from './PaymentOption';
import PromoCodes from './PromoCodes';
import StickySidebar from './StickySidebar';

// Các city, district, ward đều có dạng "name__id"

export type CheckoutFormInputs = {
  deliveryName: string;
  deliveryPhone: string;
  deliveryEmail: string;
  deliveryStreet: string;
  deliveryCity: string;
  deliveryDistrict: string;
  deliveryWard: string;
  deliveryPartnerId: string;

  deliveryMethodId: string;
  paymentMethodId: string;

  isInvoice: boolean;
  showInvoiceProducts: boolean;
  invoiceName: string;
  invoiceEmail: string;
  invoiceStreet: string;
  invoiceCity: string;
  invoiceDistrict: string;
  invoiceWard: string;
  invoiceTaxCode: string;

  customerNotes: string;
  agreement: boolean;
};

const checkoutFormDefaultValues: CheckoutFormInputs = {
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
};

const CheckoutPage = () => {
  const { t } = useTranslation(['checkout', 'errors']);

  const { data: user } = useUser();

  // Form handler with default values
  const methods = useForm<CheckoutFormInputs>({
    defaultValues: checkoutFormDefaultValues
  });

  const { register, handleSubmit, setValue } = methods;

  const [counselData, setCounselData] = useState<OutputCounsel>();

  // Counsel
  const [getCounsel, { loading: loadingCounsel }] = useLazyQueryAuth<GetCounselData, undefined>(
    GET_COUNSEL,
    {
      onCompleted: (data) => {
        setCounselData(data.getCounsel);
        if (data.getCounsel.totalDcPayment > 0) {
          setValue('paymentMethodId', '2');
        }
      },
      onError: (err) => {
        const errorCode = err.graphQLErrors?.[0]?.extensions?.code;
        toast.error(t(`errors:code_${errorCode}`));

        if (errorCode === 114) {
          router.push('/cart');
        }
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true
    }
  );

  useEffect(() => {
    getCounsel();
  }, []);

  const orderNo = counselData?.counsel?.orderNo;

  const router = useRouter();

  const { data: cart, refetch: refetchCart } = useCart();

  const [createOrder, { loading: creatingOrder }] = useMutationAuth<
    CreateOrderData,
    CreateOrderVars
  >(CREATE_ORDER, {
    onCompleted: (data) => {
      refetchCart()
        .then(() =>
          swal({
            title: t('checkout:order_success_message', {
              orderNo: data.createOrder.orderNo
            }),
            icon: 'success'
          })
        )
        .then(() => router.push('/'));
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
    const [deliveryWard, deliveryZipCode] = data.deliveryWard?.split('__') || [];
    const [invoiceWard, invoiceZipCode] = data.invoiceWard?.split('__') || [];

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
              zipCode: +deliveryZipCode || 0,
              city: data.deliveryCity?.split('__')[0] || '',
              district: data.deliveryDistrict?.split('__')[0] || '',
              ward: deliveryWard || '',
              street: data.deliveryStreet || ''
            },
            billing_address: data.isInvoice
              ? {
                  fullName: data.invoiceName,
                  email: data.invoiceEmail,
                  tax: data.invoiceTaxCode,
                  partnerId: 0,
                  isNew: true,
                  zipCode: +invoiceZipCode || 0,
                  city: data.invoiceCity?.split('__')[0] || '',
                  district: data.invoiceDistrict?.split('__')[0] || '',
                  ward: invoiceWard || '',
                  street: data.invoiceStreet || ''
                }
              : undefined
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
    const fields = Object.keys(errors);

    toast.error(errors[fields[0]].message);
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

        <LoadingBackdrop open={creatingOrder} />
      </form>
    </FormProvider>
  );
};

export default CheckoutPage;
