import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { CREATE_ORDER, CreateOrderData, CreateOrderVars } from 'src/graphql/order/createOrder';
import { GET_COUNSEL, GetCounselData, OutputCounsel } from 'src/graphql/order/getCounsel';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';
import useUser from 'src/hooks/useUser';
import swal from 'sweetalert';

import Agreement from './Agreement';
import CustomerNotes from './CustomerNotes';
import DeliveryInfo from './DeliveryInfo';
import InvoiceInfo from './InvoiceInfo';
import InvoiceProducts from './InvoiceProducts';
import PaymentOption from './PaymentOption';
import StickySidebar from './StickySidebar';

// Các city, district, ward đều có dạng "name__id"

type FormInputs = {
  deliveryName: string;
  deliveryPhone: string;
  deliveryEmail: string;
  deliveryStreet: string;
  deliveryCity: string;
  deliveryDistrict: string;
  deliveryWard: string;
  deliverySaveInfo: boolean;

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

  id: string;
};

const CheckoutPage = () => {
  const { t } = useTranslation(['checkout', 'errors']);

  const { loading: loadingUser } = useUser();

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
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  });

  useEffect(() => {
    refetchCounsel();
  }, []);

  const orderNo = counselData?.counsel?.orderNo;

  // Form handler with default values
  const methods = useForm<FormInputs>({
    defaultValues: {
      paymentMethodId: '1',
      deliverySaveInfo: true,
      invoiceSaveInfo: true,
      customerNotes: '',
      isInvoice: false,
      agreement: false
    }
  });

  const { register, handleSubmit } = methods;

  const router = useRouter();

  const { cart, refetchCart, loading: loadingCart } = useCart();

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

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
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
              partnerId: '',
              isNew: true,
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
          deliveryMethodId: 0,
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
        <div className="checkout container py-5">
          <div className="row">
            <div className="col-12 mb-3">
              <h1 className="h3">{t('checkout:title')}</h1>
            </div>

            <div className="col-md-8">
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
              {cart?.getCart.carts.some((cart) => cart.product.is_quick_invoice) && (
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

            <div className="col-md-4 mb-3">
              <div className="elevated p-3 mb-4">Hello</div>
              <StickySidebar counselData={counselData} setCounselData={setCounselData} />
            </div>
          </div>
        </div>

        <LoadingBackdrop open={creatingOrder || loadingCart || loadingUser} />
      </form>
    </FormProvider>
  );
};

export default CheckoutPage;
