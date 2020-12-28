import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { APPLY_PAYMENT, ApplyPaymentData, ApplyPaymentVars } from 'src/graphql/order/applyPayment';
import { CREATE_ORDER, CreateOrderData, CreateOrderVars } from 'src/graphql/order/createOrder';
import { GET_COUNSEL, GetCounselData, OutputCounsel } from 'src/graphql/order/getCounsel';
import {
  GET_PAYMENT_DELIVERY,
  GetPaymentAndDeliveryData
} from 'src/graphql/paymentAndDelivery/paymentAndDelivery,query';
import { GET_INVOICE_COUNSEL } from 'src/graphql/product/getProductInvoice.query';
import useAddress from 'src/hooks/useAddress';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';
import useDidUpdateEffect from 'src/hooks/useDidUpdate';
import useInvoiceCounse from 'src/hooks/useInvoiceCounsel';
import useUser from 'src/hooks/useUser';
import swal from 'sweetalert';

import ProductInvoice from '../ProductInvoice/productInvoice';
import Agreement from './Agreement';
import CustomerNotes from './CustomerNotes';
import DeliveryInfo from './DeliveryInfo';
import InvoiceInfo from './InvoiceInfo';
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

  // User
  const { user, loading: loadingUser } = useUser();

  const [counselData, setCounselData] = useState<OutputCounsel>();

  // When user data is loaded
  useEffect(() => {
    if (!user) return;

    if (user.contact_address) {
      const { street } = user.contact_address;

      setValue('deliveryStreet', street);
    }

    setValue('deliveryName', user.name);
    setValue('deliveryPhone', user.phone);
    setValue('deliveryEmail', user.email);
  }, [user]);

  // Payment & Delivery options
  const { data: paymentAndDeliveryData } = useQuery<GetPaymentAndDeliveryData, undefined>(
    GET_PAYMENT_DELIVERY,
    {
      onError: (err) => {
        toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const paymentMethods = paymentAndDeliveryData?.getPaymentAndDeliveryMethod.paymentMethods || [];

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

  // get product list invoice
  const { productsInvoice, errorProductInvoice } = useInvoiceCounse({
    orderNo: counselData?.counsel.orderNo
  });
  // const {
  //   data: dataInvoiceCounsel,
  //   loading,
  //   error,
  //   refetch: refetchProductInvoice
  // } = useQueryAuth(GET_INVOICE_COUNSEL, { variables: { orderNo: counselData?.counsel?.orderNo } });

  // console.log('dataInvoiceCounsel', dataInvoiceCounsel);

  useEffect(() => {
    refetchCounsel();
  }, []);

  // Form handler with default values
  const { register, handleSubmit, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      deliveryMethodId: '2',
      paymentMethodId: '2',
      deliverySaveInfo: true,
      invoiceSaveInfo: true,
      customerNotes: '',
      isInvoice: false,
      agreement: false
    }
  });

  // Update price on payment option change
  const paymentOption = watch('paymentOption');

  const [applyPayment] = useMutationAuth<ApplyPaymentData, ApplyPaymentVars>(APPLY_PAYMENT, {
    onCompleted: (data) => {
      setCounselData(data.applyPayment);
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors[0]?.extensions?.code}`));
    }
  });

  useDidUpdateEffect(() => {
    applyPayment({
      variables: {
        orderNo: counselData.counsel.orderNo,
        payment_method: +paymentOption
      }
    });
  }, [paymentOption]);

  const { cities: deliveryCities, districts: deliveryDistricts, wards: deliveryWards } = useAddress(
    {
      cityId: +watch('deliveryCity')?.split('__')[1],
      districtId: +watch('deliveryDistrict')?.split('__')[1],
      wardId: +watch('deliveryWard')?.split('__')[1]
    }
  );

  const { cities: invoiceCities, districts: invoiceDistricts, wards: invoiceWards } = useAddress({
    cityId: +watch('invoiceCity')?.split('__')[1],
    districtId: +watch('invoiceDistrict')?.split('__')[1],
    wardId: +watch('invoiceWard')?.split('__')[1]
  });

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
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    createOrder({
      variables: {
        inputs: {
          orderNo: counselData?.counsel.orderNo,
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
                cities={deliveryCities}
                districts={deliveryDistricts}
                wards={deliveryWards}
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

            {/* Invoice */}
            {cart?.getCart.carts.some((cart) => cart.product.is_quick_invoice) && (
              <div className="mb-4">
                <InvoiceInfo
                  register={register}
                  cities={invoiceCities}
                  districts={invoiceDistricts}
                  wards={invoiceWards}
                />
                <ProductInvoice register={register} arrayProducts={productsInvoice} />
              </div>
            )}

            {/* Agreement */}
            <div className="form-group">
              <Agreement register={register} />
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <StickySidebar counselData={counselData} setCounselData={setCounselData} />
          </div>
        </div>
      </div>

      <LoadingBackdrop open={loadingCounsel || creatingOrder || loadingUser || loadingCart} />
    </form>
  );
};

export default CheckoutPage;
