import { WithTranslation } from 'next-i18next'
import React from 'react'
import { withTranslation } from '../../../i18n'
import { useModalControlDispatch } from '../../contexts/ModalControl'

const LoginToSeePrice = ({ t }: WithTranslation) => {
  const dispatch = useModalControlDispatch()

  const openLoginModal = () => dispatch({ type: 'OPEN_LOGIN_MODAL' })

  return (
    <button onClick={openLoginModal} className="btn btn-block btn-sm btn-outline-primary">
      {t('productCard:loginToSeePrice')}
    </button>
  )
}

export default withTranslation('productCard')(LoginToSeePrice)
