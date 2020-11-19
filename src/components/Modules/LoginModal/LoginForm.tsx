import { useMutation } from '@apollo/react-hooks';
// import { emailRegex } from '../../assets/regex/email'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import Button from 'src/components/Form/Button';
import Checkbox from 'src/components/Form/Checkbox';
import Input from 'src/components/Form/Input';
import { useModalControlDispatch } from 'src/contexts/ModalControl';
import { useUser } from 'src/contexts/User';
import { LOGIN_USER, LoginData, LoginVars } from 'src/graphql/user/login.mutation';
import useLocalStorage from 'src/hooks/useLocalStorage';
import withApollo from 'src/utils/withApollo';

type Inputs = {
  username: string;
  password: string;
};

const LoginForm = (): JSX.Element => {
  const dispatch = useModalControlDispatch();

  const [, setToken] = useLocalStorage('token');

  const openRegisterModal = () => dispatch({ type: 'OPEN_REGISTER_MODAL' });

  const closeLoginModal = () => dispatch({ type: 'CLOSE_LOGIN_MODAL' });

  const router = useRouter();

  const { getUser } = useUser();

  const { register, handleSubmit } = useForm<Inputs>();

  const [login] = useMutation<LoginData, LoginVars>(LOGIN_USER, {
    onCompleted: (data) => {
      setToken(data.login.token);
      closeLoginModal();
      getUser();
      if (router.pathname !== '/products/[productId]') {
        router.push('/products');
      } else {
        router.reload();
      }
    },
    onError: (error) => {
      console.log('Login error:', error);
      toast.error('Error: ' + error.message);
    }
  });

  const onError = (errors: DeepMap<Inputs, FieldError>) => {
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
      <form className="new_account" id="new_account" onSubmit={handleSubmit(onSubmit, onError)}>
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
