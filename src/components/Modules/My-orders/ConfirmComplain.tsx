import { Dialog, GridList } from '@material-ui/core';
import axios from 'axios';
import { useTranslation } from 'i18n';
import getConfig from 'next/config';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import Button from 'src/components/Form/Button';
import Input from 'src/components/Form/Input';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import Select from 'src/components/Form/Select';
import { useUser } from 'src/contexts/User';
import {
  GET_ORDER_DETAIL,
  GetOrderDetailData,
  GetOrderDetailVars
} from 'src/graphql/order/getOrder';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';

const { publicRuntimeConfig } = getConfig();

type Props = {
  open: boolean;
  onClose: () => void;
  orderNo: string;
};
type Inputs = {
  name: string;
  phone: number;
  fault: string;
};
const faults = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

const FILES_GATEWAY = `https://${
  publicRuntimeConfig.FILES_GATEWAY_EXT || process.env.NEXT_PUBLIC_FILES_GATEWAY
}`;

const ConfirmComplain = (props: Props) => {
  const { open, onClose, orderNo } = props;
  const { t } = useTranslation(['common', 'myOrders', 'myAccount', 'faults', 'cart', 'register']);
  const [imgTime, setImgTime] = useState<number>(new Date().getTime());
  const [imgsHidden, setImgsHidden] = useState<boolean>(false);
  const { data: user } = useUser();
  const [fault, setFault] = useState<string>('');
  const { register } = useForm<Inputs>();

  // const [sourceImg, uploadImg] = useState([]);

  const sourceImg = [
    'https://i.imgur.com/Cj58bM0.jpeg',
    'https://i.imgur.com/8nLFCVP.png',
    'https://i.imgur.com/AD3MbBi.jpeg',
    'https://i.imgur.com/Jvh1OQm.jpeg',
    'https://i.imgur.com/oPR4BiX.jpg',
    'https://i.imgur.com/OPAR3PC.jpg'
  ];
  const { data: orderComplain } = useQueryAuth<GetOrderDetailData, GetOrderDetailVars>(
    GET_ORDER_DETAIL,
    {
      variables: {
        orderNo: orderNo
      }
    }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0];

    const isImage = file.type.startsWith('image');

    if (!isImage) {
      toast.error(t('cart:file_is_not_image'));
      return;
    }

    const formData = new FormData();

    formData.append('image', file);
    formData.append('id', user?.id + '');

    //uploadImg([...sourceImg, `${user?.id}?${imgTime}`]); //upload 6 imgs
    // console.log(`${user?.id}?${imgTime}`);

    axios
      .post(`${FILES_GATEWAY}/feedback`, formData)
      .then(() => {
        setImgTime(new Date().getTime());
        setImgsHidden(false);
      })
      .catch((err) => {
        console.log('Image upload error:', err);
      });
  };

  const orderName = orderComplain?.getOrderDetail.name;
  const totalAmount =
    orderComplain?.getOrderDetail.amount_total.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
    ' ' +
    t('common:vnd');

  const convertDate = (day) => {
    const date = new Date(day?.substring(0, day?.indexOf('T')));
    if (!isNaN(date?.getTime())) {
      return date?.getDate() + '/' + date?.getMonth() + 1 + '/' + date?.getFullYear();
    }
  };

  const handleSearchTypeChange = (e) => {
    setFault(e.target.value); //No.Fault
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
      <div className="container">
        <div className="text-left fa-1x c-text">
          <span>
            {' '}
            <b>{t('myOrders:feedback')}</b>{' '}
          </span>
        </div>
        <form>
          <div className="row c-inf c-block">
            <div className="col-md-4">
              {' '}
              {t('myOrders:orderNo')}: {orderName}{' '}
            </div>
            <div className="col-md-4">
              {' '}
              {t('myOrders:total')}: {totalAmount}{' '}
            </div>
            <div className="col-md-4">
              {t('myOrders:date_order')} {convertDate(orderComplain?.getOrderDetail.date_order)}{' '}
            </div>
          </div>
          <div className="row c-block">
            <div className="col-md-4">
              <Input
                name="name"
                placeholder={t('myAccount:name_label')}
                required
                maxLength={100}
                ref={register({
                  required: `${t('register:input_name_error_required')}`
                })}
              />
            </div>
            <div className="col-md-4">
              <Input
                name="phone"
                type="number"
                placeholder={t('myAccount:phone_label')}
                required
                maxLength={100}
                ref={register({
                  required: `${t('register:input_phone_error_required')}`,
                  pattern: {
                    value: viPhoneNumberRegex,
                    message: `${t('register:input_phone_error_invalid')}`
                  }
                })}
              />
            </div>

            <div className="col-md-4">
              <Select
                onChange={handleSearchTypeChange}
                className="search-type-select hide-focus"
                ref={register({
                  required: `Should input faults`
                })}
                name="select"
                required>
                {faults.map((type) => (
                  <option key={type} value={type}>
                    {t(`faults:fault_${type}`)}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="row c-block">
            <div className="container">
              <label>{t('myOrders:note')}</label>

              <textarea placeholder={t('myOrders:note')} className="form-control" maxLength={500} />
            </div>
          </div>
          <div className="c-block">
            <InputWithLabel
              label={t('myOrders:img_faults')}
              type="file"
              accept="image/*"
              placeholder={t('myOrders:max_img')}
              onChange={handleFileChange}
              containerClass="mb-2"
              labelClass="c-size"
            />
            <div className="c-block">
              <GridList cols={6}>
                {sourceImg.length != 0 &&
                  sourceImg.length <= 6 &&
                  sourceImg.map((src) => (
                    <img
                      hidden={true}
                      alt="src"
                      src={src}
                      onError={() => setImgsHidden(true)}
                      key={src}
                    />
                  ))}
              </GridList>
            </div>
          </div>
          <div className="c-block">
            <Button type="submit" variant="primary" className="my-1">
              {t('cancelOrder:button_title')}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default ConfirmComplain;
