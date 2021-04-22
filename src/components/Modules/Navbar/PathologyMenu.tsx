import { useQuery } from '@apollo/client';
import { Drawer, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useState } from 'react';
import { GET_PATHOLOGIES, GetPathologiesData } from 'src/graphql/pathology/getPathologies';
import { Pathology } from 'src/graphql/pathology/getPathologies';

type Props = {
  pathologies: Pathology[];
  onClose: () => void;
};

function PathologyDropdownMenu(props: Props) {
  const { t } = useTranslation(['navbar']);
  const { pathologies, onClose } = props;
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 text-uppercase">
        <div>
          <span className="text-muted icomoon icon-tune mr-3" />
          {t('navbar:pathology')}
        </div>

        <div className="d-block d-sm-none">
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      {pathologies.map(({ id, name }) => (
        <div key={id} className="mb-2">
          <Link href={`/products?pathology=${id}`}>
            <a type="button" role="button" onClick={onClose} onKeyDown={onClose} tabIndex={0}>
              {name}
            </a>
          </Link>
        </div>
      ))}
    </>
  );
}

function PathologyMenu() {
  const { t } = useTranslation(['navbar']);
  const [open, setOpen] = useState(false);

  const { data: pathologiesData } = useQuery<GetPathologiesData, undefined>(GET_PATHOLOGIES);
  const pathologies = pathologiesData?.getPathologies;

  return (
    <>
      <li className="main-menu rockland-nav__item d-none d-sm-block">
        <div className="menu-title">
          <Link href="/pathological">
            <a className="rockland-nav__link">
              <i className="rockland-nav__icon fas fa-laptop-medical" />
              <span className="rockland-nav__title_d">{t('navbar:pathological')}</span>
              <span className="rockland-nav__title_deal">{t('navbar:path_search')}</span>
              <span className="rockland-nav__title_deal">{t('navbar:path_sick')}</span>
            </a>
          </Link>
        </div>
        {pathologies && (
          <ul className="container-menu pathology-menu">
            {pathologies.map(({ id, name }) => (
              <li className="menu-item" key={id}>
                <div className="item-title">
                  <Link href={`/products?pathology=${id}`}>
                    <a className="item-link">{name}</a>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </li>
      <li className="main-menu rockland-nav__item d-block d-sm-none">
        <div className="menu-title">
          <button onClick={() => setOpen(true)}>
            <a className="rockland-nav__link">
              <i className="rockland-nav__icon fas fa-laptop-medical" />
              <span className="rockland-nav__title">{t('navbar:category')}</span>
            </a>
          </button>
        </div>
        <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
          <div className="p-3 min-vh-100">
            <PathologyDropdownMenu pathologies={pathologies} onClose={() => setOpen(false)} />
          </div>
        </Drawer>
      </li>
    </>
  );
}

export default PathologyMenu;
