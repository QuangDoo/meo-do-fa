import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '../Button'
import Checkbox from '../Form/Checkbox'
import AccountLoginInformation from './AccountLoginInformation'
import Input from '../Form/Input'
import { viPhoneNumberRegex } from '../../assets/regex/viPhoneNumber'
import { emailRegex } from '../../assets/regex/email'

type Props = {}

type Inputs = {
  username: string
  password: string
}

const LoginForm: FC<Props> = (props) => {
  const { register, handleSubmit, errors } = useForm<Inputs>()
  useEffect(() => {
    if (!errors) return

    Object.keys(errors).forEach((errorField) => toast.error(errors[errorField].message))
  }, [errors])
  const onSubmit = (data) => {
    console.log('data', data)
  }

  return (
    <div>
      <form className="new_account" id="new_account" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="username"
          ref={register({
            pattern: {
              value: emailRegex || viPhoneNumberRegex,
              message: 'Xin email hoặc số điện thoại hợp lệ.',
            },
          })}
          containerClass="mb-4"
          iconClass="icomoon icon-user"
          required
          placeholder="Nhập số điện thoại hoặc email."
        />


        <Input
          name="password"
          ref={register({minLength:{
            value: 6,
            message: 'Xin nhập mật khẩu tối thiểu 6 kí tự.'
          }})}
          containerClass="mb-3"
          required={true}
          iconClass="icomoon icon-lock"
          placeholder="Nhập mật khẩu"
          type="password"
        />

        <Checkbox name="remember_password" label="Nhớ mật khẩu" className="align-self-start" />

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
          <a className="text-secondary ml-1" data-modal="true" href="/authentications/signup">
            <b>đăng ký thành viên</b>
          </a>
          .
        </span>
      </form>
    </div>
  )
}

export default LoginForm
