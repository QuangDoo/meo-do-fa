import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import Input from 'src/components/Form/Input';
import { useModalControlDispatch } from 'src/contexts/ModalControl';
import { useUser } from 'src/contexts/User';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import {
  VERIFY_USER,
  verifyUserData,
  verifyUserVar
} from '../../../graphql/user/verifyUser.mutation';

type Inputs = {
  otp_code: string;
};

const ConfirmAccountForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const { getUser, refetch: refectUser } = useUser();

  const route = useRouter();

  const { t } = useTranslation(['password', 'errors', 'register', 'success']);

  const { closeModal } = useModalControlDispatch();

  const onFormError = (errors: DeepMap<Inputs, FieldError>) => {
    Object.keys(errors).forEach((field) => toast.error(errors[field].message));
  };

  const [send_otp] = useMutationAuth<verifyUserData, verifyUserVar>(VERIFY_USER, {
    onCompleted: () => {
      toast.success(t(`success:auth_otp_succesfully`));
      closeModal();

      refectUser();
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const onSubmit = (data: Inputs) => {
    send_otp({
      variables: {
        otp: data.otp_code
      }
    });
  };

  return (
    <form className="reset_pass" onSubmit={handleSubmit(onSubmit, onFormError)}>
      <Input
        name="otp_code"
        ref={register}
        containerClass="mb-4"
        iconClass="icomoon icon-mail"
        placeholder={t('register:otp_code')}
      />

      <Button type="submit" variant="gradient" block>
        {t('register:send_otp')}
      </Button>
    </form>
  );
};

export default ConfirmAccountForm;
