import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { CREATE_ORDER, CreateOrderData, CreateOrderVars } from 'src/graphql/order/createOrder';
import { GET_COUNSEL, GetCounselData, OutputCounsel } from 'src/graphql/order/getCounsel';
import { GET_ADDRESS_INFO_USER, GetAddressInfoData } from 'src/graphql/user/getAddressInfoUser';
import useCart from 'src/hooks/useCart';
import useUser from 'src/hooks/useUser';
import { useToken } from 'src/pages/checkout';
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

type Props = {
  token?: string;
};

const CheckoutPage = (props: Props) => {
  const { t } = useTranslation(['checkout', 'errors']);

  const token = useToken();

  const { loading: loadingUser } = useUser();

  const [counselData, setCounselData] = useState<OutputCounsel>();

  const { cart, refetchCart, loading: loadingCart } = useCart();

  const { data: getCounselData, refetch: refetchCounsel } = useQuery<GetCounselData, undefined>(
    GET_COUNSEL,
    {
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
      notifyOnNetworkStatusChange: true,
      context: {
        headers: {
          authorization: token
        }
      }
    }
  );

  const orderNo = getCounselData?.getCounsel.counsel.orderNo;

  useEffect(() => {
    refetchCounsel();
  }, []);

  const { data: getAddressInfoUserData } = useQuery<GetAddressInfoData, undefined>(
    GET_ADDRESS_INFO_USER
  );

  const deliveryAddresses = getAddressInfoUserData?.getAddressInfoUser.deliveries;
  const invoiceAddresses = getAddressInfoUserData?.getAddressInfoUser.invoices;

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

  const [createOrder, { loading: creatingOrder }] = useMutation<CreateOrderData, CreateOrderVars>(
    CREATE_ORDER,
    {
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
      },
      context: {
        headers: {
          authorization: props.token
        }
      }
    }
  );

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
    toast.error(errors[Object.keys(errors)[0]].message);
  };

  return (
    <FormProvider {...methods}>
      <form className="checkout__form" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="checkout container py-5">
          <div className="row">
            <div className="col-12 mb-3">
              <h1 className="h3">{t('checkout:title')}</h1>
            </div>

            <div className="col-lg-8">
              <div className="mb-4">
                <DeliveryInfo deliveryAddresses={deliveryAddresses} />
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

            <div className="col-lg-4 mb-3">
              <PromoCodes
                counselData={counselData}
                setCounselData={setCounselData}
                token={props.token}
              />
              <StickySidebar counselData={counselData} />
            </div>
          </div>
        </div>

        <LoadingBackdrop open={creatingOrder || loadingCart || loadingUser} />
      </form>
    </FormProvider>
  );
};

export default CheckoutPage;
