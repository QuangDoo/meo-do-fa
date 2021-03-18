import { Menu, MenuItem } from '@material-ui/core';
import { i18n, useTranslation } from 'i18n';
import React, { MouseEvent, useState } from 'react';

export type LanguageCode = 'vi' | 'en';

export const languageNames: Record<LanguageCode, string> = {
  vi: 'Tiếng Việt',
  en: 'English'
};

const LanguagePicker = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { t } = useTranslation(['header']);

  const openMenu = (event: MouseEvent) => setAnchorEl(event.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  const onLanguageClick = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    closeMenu();
  };

  return (
    <>
      <button className="promotion-nav__link" onClick={openMenu} style={{ border: 'none' }}>
        <i className="promotion-nav__icon fas fa-globe-americas" />
        <span>{t('header:language')}</span>
      </button>

      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={closeMenu}>
        {Object.keys(languageNames).map((code: LanguageCode) => (
          <MenuItem
            key={code}
            onClick={() => onLanguageClick(code)}
            selected={code === i18n.language}>
            {languageNames[code]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguagePicker;
