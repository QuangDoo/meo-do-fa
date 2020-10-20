import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Checkbox from '../Form/Checkbox'
import AccountLoginInformation from './AccountLoginInformation'
type Props = {}
type Inputs = {
    data: string
}
const LoginForm: FC<Props> = (props) => {
    const { register, handleSubmit, setValue, watch, errors } = useForm<Inputs>({
        defaultValues: {
            data: '',
        },
    })
    console.log('errors', errors)
    console.log('watch', watch())
    const submit = (data) => {
        console.log('data', data)
        
    }
    return (
        <div>
            <form className="new_account" id="new_account" onSubmit={handleSubmit(submit)}>

                <AccountLoginInformation ref={register} />

                <Checkbox name="remember_password" label="Nhớ mật khẩu" />
                <div className="mb-4">
                    <a data-modal="true" href="/authentications/reset_password">Quên mật khẩu</a>
                </div>
                <Button variant="gradient" block>Đăng nhập</Button>
                <span className="text-capitalize ">
                    Để nhận ưu đãi hấp dẫn,
                    
                    <a className="text-secondary ml-1" data-modal="true" href="/authentications/signup">
                        <b>đăng ký thành viên</b>
                    </a>.
                </span>
            </form>
        </div>
    )
}
export default LoginForm;