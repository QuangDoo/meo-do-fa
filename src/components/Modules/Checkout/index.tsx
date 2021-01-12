import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';
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

// Các city, district, ward đều có dạng "name__id"

export type CheckoutFormInputs = {
  deliveryName: string;
  deliveryPhone: string;
  deliveryEmail: string;
  deliveryStreet: string;
  deliveryCity: string;
  deliveryDistrict: string;
  deliveryWard: string;
  deliverySaveInfo: boolean;
  deliveryPartnerId: string;

  deliveryMethodId: string;
  paymentMethodId: string;

  isInvoice: boolean;
  invoiceName: string;
  invoiceEmail: string;
  invoiceStreet: string;
  invoiceCity: string;
  invoiceDistrict: string;
  invoiceWard: string;
  invoiceTaxCode: string;
  invoiceSaveInfo: boolean;

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
  deliverySaveInfo: true,
  deliveryPartnerId: '',

  deliveryMethodId: '0',
  paymentMethodId: '1',

  isInvoice: false,
  invoiceName: '',
  invoiceEmail: '',
  invoiceStreet: '',
  invoiceCity: '',
  invoiceDistrict: '',
  invoiceWard: '',
  invoiceTaxCode: '',
  invoiceSaveInfo: true,

  customerNotes: '',
  agreement: false
};

const CheckoutPage = () => {
  const { t } = useTranslation(['checkout', 'errors']);

  const [counselData, setCounselData] = useState<OutputCounsel>();

  // Counsel
  const { refetch: refetchCounsel, loading: loadingCounsel } = useQueryAuth<
    GetCounselData,
    undefined
  >(GET_COUNSEL, {
    onCompleted: (data) => {
      setCounselData(data.getCounsel);
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
  });

  useEffect(() => {
    refetchCounsel();
  }, []);

  const orderNo = counselData?.counsel?.orderNo;

  // Form handler with default values
  const methods = useForm<CheckoutFormInputs>({
    defaultValues: checkoutFormDefaultValues
  });

  const { register, handleSubmit } = methods;

  const router = useRouter();

  const { data: cart, refetch: refetchCart } = useCart();

  const [createOrder, { loading: creatingOrder }] = useMutationAuth<
    CreateOrderData,
    CreateOrderVars
  >(CREATE_ORDER, {
    onCompleted: (data) => {
      refetchCart();

      swal({
        title: t('checkout:order_success_message', {
          orderNo: data.createOrder.orderNo
        }),
        icon: 'success'
      }).then(() => {
        router.push('/');
      });
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
    console.log('create order submit data:', data);

    return;

    createOrder({
      variables: {
        inputs: {
          orderNo: orderNo,
          customer: {
            fullName: data.deliveryName,
            phone: data.deliveryPhone,
            email: data.deliveryEmail,
            shipping_address: {
              fullName: data.deliveryName,
              phone: data.deliveryPhone,
              email: data.deliveryEmail,
              partnerId: data.deliveryPartnerId,
              isNew: !!data.deliveryPartnerId,
              zipCode: +data.deliveryWard.split('__')[1],
              city: data.deliveryCity.split('__')[0],
              district: data.deliveryDistrict.split('__')[0],
              ward: data.deliveryWard.split('__')[0],
              street: data.deliveryStreet
            },
            billing_address: data.isInvoice
              ? {
                  fullName: data.invoiceName,
                  email: data.invoiceEmail,
                  tax: data.invoiceTaxCode,
                  partnerId: '',
                  isNew: true,
                  zipCode: +data.invoiceWard.split('__')[1],
                  city: data.invoiceCity.split('__')[0],
                  district: data.invoiceDistrict.split('__')[0],
                  ward: data.invoiceWard.split('__')[0],
                  street: data.invoiceStreet
                }
              : undefined
          },
          paymentMethodId: +data.paymentMethodId,
          deliveryMethodId: +data.deliveryMethodId,
          note: data.customerNotes,
          isInvoice: !!data.isInvoice
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
            <div className="col-12 mb-3">
              <h1 className="h3">{t('checkout:title')}</h1>
            </div>

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
