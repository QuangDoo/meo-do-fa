import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import Button from 'src/components/Form/Button';
import Input from 'src/components/Form/Input';
import { useModalControlDispatch } from 'src/contexts/ModalControl';
import { LOGIN_USER } from 'src/graphql/user/login.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import withApollo from 'src/utils/withApollo';

type Inputs = {
  username: string;
  password: string;
};

const RessetPassForm = ({ t }: WithTranslation): JSX.Element => {
  const dispatch = useModalControlDispatch();

  const router = useRouter();

  const { register, handleSubmit } = useForm<Inputs>();

  const [login, { data, error }] = useMutationAuth(LOGIN_USER);

  // onCompleted

  // onError (GraphQL)
  useEffect(() => {
    if (!error) return;

    console.log('Login error:', { error });

    toast.error(t(`errors:code_${error.graphQLErrors[0].extensions.code}`));
  }, [error]);

  const onFormError = (errors: DeepMap<Inputs, FieldError>) => {
    Object.keys(errors).forEach((field) => toast.error(errors[field].message));
  };

  const onSubmit = (data: Inputs) => {
    login({
      variables: {
        inputs: {
          phone: data.username,
          password: data.password
        }
      }
    });
  };

  return (
    <div>
      <form className="resset_pass" onSubmit={handleSubmit(onSubmit, onFormError)}>
        <Input
          name="username"
          ref={register({
            pattern: {
              value: viPhoneNumberRegex,
              message: t('login:invalid_phone')
            }
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-phone"
          required
          placeholder={t('password:placeholder_ressetpass')}
        />
        <Button type="submit" variant="gradient" block className="mb-5">
          {t('password:send_recovery_link')}
        </Button>
      </form>
    </div>
  );
};

const Translated = withTranslation(['password', 'errors', 'login'])(RessetPassForm);

export default Translated;
