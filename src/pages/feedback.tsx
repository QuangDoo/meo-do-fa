import { useMutation } from '@apollo/client';
import axios from 'axios';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import Button from 'src/components/Form/Button';
import FormGroup from 'src/components/Form/FormGroup';
import FormGroupLabel from 'src/components/Form/FormGroupLabel';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import SelectWithLabel from 'src/components/Form/SelectWithLabel';
import Textarea from 'src/components/Form/Textarea';
import Head from 'src/components/Layout/Head';
import AddFeedbackImage from 'src/components/Modules/Feedback/AddFeedbackImage';
import FeedbackImage from 'src/components/Modules/Feedback/FeedbackImage';
import { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import { FILES_GATEWAY } from 'src/constants';
import {
  CREATE_FEEDBACK,
  CreateFeedbackData,
  CreateFeedbackVar
} from 'src/graphql/feedback/createFeedback';
import { GET_FEEDBACK_TYPES, GetFeedbackTypesData } from 'src/graphql/feedback/getFeedbackTypes';
import {
  GET_ORDER_DETAIL,
  GetOrderDetailData,
  GetOrderDetailVars
} from 'src/graphql/order/getOrder';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import withToken from 'src/utils/withToken';

Feedback.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'feedback']
});

function Feedback() {
  const { t } = useTranslation(['feedback']);
  const router = useRouter();

  type ImageObject = {
    file?: File;
    src: string;
  };

  const [previewImages, setPreviewImages] = useState<ImageObject[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  const { data: feedbackTypesData } = useQueryAuth<GetFeedbackTypesData, undefined>(
    GET_FEEDBACK_TYPES,
    {
      onError: (err) => {
        toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const feedbackTypes = feedbackTypesData?.getFeedbackTypes;

  const orderNo = router.query.orderno as string;
  const guessName = router.query.name as string;
  const guessPhone = router.query.phone as string;

  const { data: orderData } = useQueryAuth<GetOrderDetailData, GetOrderDetailVars>(
    GET_ORDER_DETAIL,
    {
      variables: {
        orderNo
      }
    }
  );

  const order = orderData?.getOrderDetail;
  type Input = {
    guessName: string;
    guessPhone: string;
    type: string;
    note?: string;
    images: string[];
  };

  const defaultInput: Input = {
    guessName,
    guessPhone,
    type: '',
    note: '',
    images: []
  };
  const { register, handleSubmit } = useForm<Input>({
    defaultValues: defaultInput
  });

  const onError = (error) => {
    toast.error(error[Object.keys(error)[0]].message);
  };

  const [createFeedback] = useMutation<CreateFeedbackData, CreateFeedbackVar>(CREATE_FEEDBACK, {
    onCompleted: () => {
      toast.success(t('send_feedback_success'));
    },
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const uploadNewImages = async () => {
    // Get new images (images that has file)
    const newImages = previewImages.filter((o) => o.file);

    if (newImages.length === 0) return;

    // Form data to upload new images
    const formData = new FormData();

    // Add new images to form data
    newImages.forEach((image) => {
      formData.append('images', image.file);
    });

    try {
      // Upload new images
      // response.data is a string array containing updated image ids
      const response = await axios.post(`${FILES_GATEWAY}/feedback`, formData);
      return response.data;
    } catch (error) {
      console.log('Upload feedback error:', error);
    }
  };

  const onSubmit = async (data) => {
    const newIds = await uploadNewImages();

    const imageIds = previewImages.map((o) =>
      o.src.startsWith(FILES_GATEWAY) ? o.src.split('/').pop() : newIds?.shift()
    );

    createFeedback({
      variables: {
        inputs: {
          orderNo: orderNo,
          guessName: data.guessName,
          guessPhone: data.guessPhone,
          type: data.type,
          note: data.note,
          images: imageIds
        }
      }
    }).catch((error) => toast.error(error));
  };

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <div className="container">
        <div className="feedback-title">{t('title')}</div>
        <div className="feedback-form">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="row">
              <div className="col-12 col-md-4 feedback-form-group">
                <FormGroupLabel>{t('order_no_label')}</FormGroupLabel>
                <div>{order?.name}</div>
              </div>
              <div className="col-12 col-md-4 feedback-form-group">
                <FormGroupLabel>{t('create_date_label')}</FormGroupLabel>
                <div>{new Date(order?.date_order).toLocaleDateString('en-GB')}</div>
              </div>
              <div className="col-12 col-md-4 feedback-form-group">
                <FormGroupLabel>{t('total_amount_label')}</FormGroupLabel>
                <div>
                  <NumberFormat
                    value={order?.amount_total}
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                    suffix={' ' + t('common:vnd')}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4">
                <InputWithLabel
                  name="guessName"
                  ref={register({
                    required: `${t('name_required')}`
                  })}
                  type="text"
                  label={t('customer_name_label')}
                  required
                />
              </div>
              <div className="col-12 col-md-4">
                <InputWithLabel
                  name="guessPhone"
                  ref={register({
                    required: `${t('phone_required')}`,
                    pattern: {
                      value: viPhoneNumberRegex,
                      message: `${t('phone_invalid')}`
                    }
                  })}
                  type="text"
                  label={t('customer_phone_label')}
                  required
                />
              </div>
              <div className="col-12 col-md-4">
                <SelectWithLabel
                  name="type"
                  ref={register({
                    required: `${t('issue_required')}`
                  })}
                  label={t('issue_name_label')}
                  required>
                  <option value="">{t('issue_placeholder')}</option>
                  {feedbackTypes?.map((feedback) => (
                    <option key={feedback.id} value={feedback.id}>
                      {feedback.name}
                    </option>
                  ))}
                </SelectWithLabel>
              </div>
            </div>
            <Textarea name="note" ref={register} label={t('note_label')} />

            <FormGroup>
              <FormGroupLabel>{t('image_label')}</FormGroupLabel>

              <div className="certificate-container">
                {previewImages.map((image, index) => (
                  <FeedbackImage
                    key={image.src}
                    image={image}
                    index={index}
                    setFeedbackImages={setPreviewImages}
                    setDeletedImageIds={setDeletedImageIds}
                  />
                ))}

                <AddFeedbackImage
                  setPreviewImages={setPreviewImages}
                  previewImages={previewImages}
                />
              </div>
            </FormGroup>
            <div className="d-flex justify-content-end my-5">
              <Button type="submit" variant="primary">
                {t('send_request')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default withToken({ ssr: true })(Feedback);
