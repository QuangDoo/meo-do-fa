/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Menu, MenuItem } from '@material-ui/core'
import { TFunction } from 'next-i18next'
import React, { MouseEvent, useState } from 'react'
import { i18n, withTranslation } from '../../../i18n'

type Props = {
  readonly t: TFunction
}

export type LanguageCode = 'vi' | 'en'

export const languageNames: Record<LanguageCode, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
}

const LanguagePicker = ({ t }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = (event: MouseEvent) => setAnchorEl(event.currentTarget)

  const closeMenu = () => setAnchorEl(null)

  const onLanguageClick = (code: LanguageCode) => {
    i18n.changeLanguage(code)
    closeMenu()
  }

  return (
    <>
      <a className="promotion-nav__link" onClick={openMenu}>
        <i className="promotion-nav__icon fas fa-language" />
        <span>{t('header:language')}</span>
      </a>

      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={closeMenu}>
        {Object.keys(languageNames).map((code: LanguageCode) => (
          <MenuItem
            key={code}
            onClick={() => onLanguageClick(code)}
            selected={code === i18n.language}
          >
            {languageNames[code]}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default withTranslation('header')(LanguagePicker)
