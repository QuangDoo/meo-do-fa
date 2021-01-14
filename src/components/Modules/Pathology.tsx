import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import { GET_PATHOLOGIES, GetPathologiesData } from 'src/graphql/pathology/getPathologies';

function Pathology() {
  const { t } = useTranslation(['navbar']);

  const { data: pathologiesData } = useQuery<GetPathologiesData, undefined>(GET_PATHOLOGIES);
  const pathologies = pathologiesData?.getPathologies;

  return (
    <>
      <li className="main-menu rockland-nav__item d-none d-sm-block">
        <div className="menu-title">
          {/* <Link href="/pathological">
                        <a className="rockland-nav__link"> */}
          <i className="rockland-nav__icon fas fa-laptop-medical" />
          <span className="rockland-nav__title">{t('navbar:pathological')}</span>
          {/* </a>
                    </Link> */}
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
    </>
  );
}

export default Pathology;
