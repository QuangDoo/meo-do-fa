import { Menu, MenuItem } from '@material-ui/core';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { MouseEvent, useEffect, useMemo, useState } from 'react';

export type LanguageCode = 'vi' | 'en';

export const languageNames: Record<LanguageCode, string> = {
  vi: 'Vietnamese',
  en: 'English'
};

const LanguagePicker = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { t, i18n } = useTranslation(['header', 'routes']);

  const router = useRouter();

  const openMenu = (event: MouseEvent) => setAnchorEl(event.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  const onLanguageClick = (code: LanguageCode) => {
    i18n.changeLanguage(code).then(() => {
      let newPath = window.location.pathname
        .split('/')
        .map((path) => t(`routes:${path}`))
        .join('/');

      newPath += window.location.search;

      console.log('New path:', newPath);

      router.replace(newPath); // ???
    });
    closeMenu();
  };

  useEffect(() => {
    console.log('Language:', i18n.language);
  }, [i18n.language]);

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
