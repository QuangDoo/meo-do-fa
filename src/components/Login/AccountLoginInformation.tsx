import React, { FC, forwardRef } from 'react'
import Input from '../Form/Input'
type Props = {
    error?: string
}
const AccountLoginInformation = (props: Props, formRef) => {
    return (
        <>
            <Input name="username"
                ref={formRef({ pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                containerClass="mb-4"
                iconClass="icomoon icon-user"
                required={true}
                placeholder="Nhập số điện thoại hoặc email" />
            <p>{props.error && "Không đúng định đúng"}</p>
            <Input name="password"
                ref={formRef}
                containerClass="mb-4"
                required={true}
                iconClass="icomoon icon-lock"
                placeholder="Nhập mật khẩu"
                type="password" />
        </>
    )
}
export default forwardRef(AccountLoginInformation) 