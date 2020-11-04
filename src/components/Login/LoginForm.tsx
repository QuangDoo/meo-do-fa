import { useMutation } from '@apollo/react-hooks';
// import { emailRegex } from '../../assets/regex/email'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { viPhoneNumberRegex } from '../../assets/regex/viPhoneNumber';
import { useModalControlDispatch } from '../../contexts/ModalControl';
import { LOGIN_USER } from '../../graphql/user/login.mutation';
import withApollo from '../../utils/withApollo';
import Button from '../form/Button';
import Checkbox from '../Form/Checkbox';
// import AccountLoginInformation from './AccountLoginInformation'
import Input from '../Form/Input';

type Inputs = {
  username: string;
  password: string;
};

const LoginForm = (): JSX.Element => {
  const dispatch = useModalControlDispatch();

  const openRegisterModal = () => dispatch({ type: 'OPEN_REGISTER_MODAL' });

  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [login, { data: loginData, error: loginError }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (!errors) return;

    Object.keys(errors).forEach((errorField) => toast.error(errors[errorField].message));
  }, [errors]);

  useEffect(() => {
    if (loginData?.login?.token) {
      router.push('/quick-order');
      window.localStorage.setItem('token', loginData.login.token);
    }
  }, [loginData]);

  const onSubmit = async (data: Inputs) => {
    await login({
      variables: {
        phone: data.username,
        password: data.password
      }
    });
    console.log('data :>> ', loginError);
  };

  return (
    <div>
      <form className="new_account" id="new_account" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="username"
          ref={register({
            pattern: {
              value: viPhoneNumberRegex,
              message: 'Xin nhập số điện thoại hợp lệ.'
            }
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-user"
          required
          placeholder="Nhập số điện thoại."
        />

        <Input
          name="password"
          ref={register({
            minLength: {
              value: 6,
              message: 'Xin nhập mật khẩu tối thiểu 6 kí tự.'
            }
          })}
          containerClass="mb-3"
          required={true}
          iconClass="icomoon icon-lock"
          placeholder="Nhập mật khẩu"
          type="password"
        />

        <Checkbox
          name="remember_password"
          ref={register}
          label="Nhớ mật khẩu"
          containerClass="form-group align-self-start"
          labelClass="pt-1"
        />

        <div className="mb-4">
          <a data-modal="true" href="/authentications/reset_password">
            Quên mật khẩu
          </a>
        </div>

        <Button type="submit" variant="gradient" block className="mb-5">
          Đăng nhập
        </Button>

        <span className="text-capitalize ">
          Để nhận ưu đãi hấp dẫn,
          <button className="text-secondary ml-1" onClick={openRegisterModal} type="button">
            <b>đăng ký thành viên</b>
          </button>
          .
        </span>
      </form>
    </div>
  );
};

export default withApollo({ ssr: true })(LoginForm);
