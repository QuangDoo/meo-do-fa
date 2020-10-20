import React, { FC, forwardRef } from 'react'
import Input from '../Form/Input'
type Props = {

}
const AccountLoginInformation = (props: Props, formRef) => {
    return (
        <>
            <Input name="name"
                ref={formRef}
                containerClass="mb-4"
                iconClass="icomoon icon-user"
                placeholder="Nhập số điện thoại hoặc email" />
            <Input name="password"
                ref={formRef}
                containerClass="mb-4"
                iconClass="icomoon icon-lock"
                placeholder="Nhập mật khẩu"
                type="password" />
        </>
    )
}
export default forwardRef(AccountLoginInformation) 