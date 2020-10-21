import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Checkbox from '../Form/Checkbox'
import AccountLoginInformation from './AccountLoginInformation'

type Props = {}

type Inputs = {
  username: string
  password: string
}

const LoginForm: FC<Props> = (props) => {
  const { register, handleSubmit, errors } = useForm<Inputs>()

  const submit = (data) => {
    console.log('data', data)
  }

  return (
    <div>
      <form className="new_account" id="new_account" onSubmit={handleSubmit(submit)}>
        <AccountLoginInformation ref={register} error={errors.username?.type} />

        <Checkbox name="remember_password" label="Nhớ mật khẩu" className="align-self-start" />

        <div className="mb-4">
          <a data-modal="true" href="/authentications/reset_password">
            Quên mật khẩu
          </a>
        </div>

        <Button variant="gradient" block className="mb-5">
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
