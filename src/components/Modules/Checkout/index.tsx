import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import AddressSelect from 'src/components/Form/AddressSelect';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useUserContext } from 'src/contexts/User';
import {
  CREATE_INVOICE_USER,
  CreateInvoiceUserData,
  CreateInvoiceUserVars
} from 'src/graphql/order/createInvoiceUser';
import { CREATE_ORDER, CreateOrderData, CreateOrderVars } from 'src/graphql/order/createOrder';
import { GET_COUNSEL, GetCounselData } from 'src/graphql/order/getCounsel';
import {
  GET_PAYMENT_DELIVERY,
  GetPaymentAndDeliveryData
} from 'src/graphql/paymentAndDelivery/paymentAndDelivery,query';
import useAddress from 'src/hooks/useAddress';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';
import useCountCart from 'src/hooks/useCountCart';
import swal from 'sweetalert';

import FormCard from '../MyAccount/FormCard';
import Agreement from './Agreement';
import CustomerNotes from './CustomerNotes';
import DeliveryInfo from './DeliveryInfo';
import DeliveryOption from './DeliveryOption';
import InvoiceInfo from './InvoiceInfo';
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
  isInvoice: boolean;
  fullnameInvoice: string;
  emailInvoice: string;
  companyStreet: string;
  companyCityId: string;
  companyDistrictId: string;
  companyWardId: string;
  vat: string;
  id: string;
};

const CheckoutPage = () => {
  const { t } = useTranslation(['checkout']);

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
      address: user?.contact_address?.street,
      // cityId: user?.city.id,
      // districtId: user?.district.id,
      // wardId: user?.ward.id,
      deliveryOption: '2',
      paymentOption: '2',
      saveInfo: true,
      customerNotes: '',
      vat: user?.vat,
      isInvoice: false,
      agreement: false,
      fullnameInvoice: user?.name,
      emailInvoice: user?.email
    }
  });

  const { cities, districts, wards, chosenCity, chosenDistrict, chosenWard } = useAddress({
    cityId: +watch('cityId'),
    districtId: +watch('districtId'),
    wardId: +watch('wardId')
  });

  // address invoice
  const {
    cities: companyCities,
    districts: companyDistricts,
    wards: companyWards,
    chosenCity: companyChosenCity,
    chosenDistrict: companyChosenDistrict,
    chosenWard: companyChosenWard
  } = useAddress({
    cityId: +watch('companyCityId'),
    districtId: +watch('companyDistrictId'),
    wardId: +watch('companyWardId')
  });

  const router = useRouter();

  const { refetchCart } = useCart();

  const { refetchCountCart } = useCountCart();

  const [createOrder, { loading: creatingOrder }] = useMutationAuth<
    CreateOrderData,
    CreateOrderVars
  >(CREATE_ORDER, {
    onCompleted: (data) => {
      swal({
        title: t('checkout:order_success_message', {
          orderNo: data.createOrder.orderNo
        }),
        icon: 'success'
      }).then(() => {
        refetchCart();
        refetchCountCart();
        router.push('/');
      });
    },
    onError: () => {
      toast.error(t('order_fail_message'));
    }
  });
  // const [createInvoiceUser] = useMutationAuth<CreateInvoiceUserData, CreateInvoiceUserVars>(
  //   CREATE_INVOICE_USER,
  //   {
  //     onCompleted: (data) => {
  //       refetchCart();
  //       router.push('/');
  //     },
  //     onError: () => {
  //       toast.error(t('order_fail_message'));
  //     }
  //   }
  // );

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    createOrder({
      variables: {
        inputs: {
          orderNo: counselData?.getCounsel.counsel.orderNo,
          customer: {
            billing_address: {
              partnerId: '',
              isNew: true,
              zipCode: +data.wardId,
              city: chosenCity.name,
              district: chosenDistrict.name,
              ward: chosenWard.name,
              street: data.address
            },
            fullName: data.name,
            phone: data.phone,
            email: data.email,
            shipping_address: {
              partnerId: '',
              isNew: true,
              zipCode: +data.wardId,
              city: chosenCity.name,
              district: chosenDistrict.name,
              ward: chosenWard.name,
              street: data.address
            }
          },
          paymentMethodId: +data.paymentOption,
          deliveryMethodId: 0,
          note: data.customerNotes,
          isInvoice: data.isInvoice
          // vat: data.vat,
        }
      }
    });
    // createInvoiceUser({
    //   variables: {
    //     inputs: {
    //       fullName: data.name,
    //       email: data.email,
    //       shipping_address: {
    //         street: data.companyStreet,
    //         city: {
    //           id: companyChosenCity.id,
    //           name: companyChosenCity.name
    //         },
    //         district: {
    //           id: companyChosenDistrict.id,
    //           name: companyChosenDistrict.name
    //         },
    //         ward: {
    //           id: companyChosenWard.id,
    //           name: companyChosenWard.name
    //         }
    //       },
    //       phone: data.phone,
    //       id: 0
    //     }
    //   }
    // });
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

            <div className="mb-4" hidden>
              <DeliveryOption register={register} deliveryMethods={deliveryMethods} />
            </div>

            {/* Payment */}
            <div className="mb-4">
              <PaymentOption register={register} paymentMethods={paymentMethods} />
            </div>
            {/* Notes */}
            <div className="mb-4">
              <CustomerNotes register={register} />
            </div>
            {/* Invoice */}
            <div className="mb-4">
              <InvoiceInfo
                register={register}
                cities={cities}
                districts={districts}
                wards={wards}
              />
            </div>

            {/* Agreement */}
            <div className="form-group">
              <Agreement register={register} />
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <StickySidebar counselData={counselData} />
          </div>
        </div>
      </div>

      <LoadingBackdrop open={creatingOrder} />
    </form>
  );
};

export default CheckoutPage;
