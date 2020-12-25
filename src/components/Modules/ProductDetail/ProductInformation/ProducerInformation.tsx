import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import ScrollableTabsButtonAuto from 'src/components/ScrollableTabsButtonAuto/ScrollableTabsButtonAuto';
import { ProductDetails } from 'src/graphql/product/product.query';

// import Tab from '../../../Tab/Tab';

const ProducerInformation = (props: ProductDetails): JSX.Element => {
  const { t } = useTranslation(['ingredientDetails']);
  return (
    <div className="ml-3 mt-3 ">
      <div className="mb-3">
        <div hidden={props.ingredients?.length === 0}>
          <div className="product__info-label">{t('ingredient')}</div>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <th>{t('name')}</th>
                <th>{t('concentrations')}</th>
              </tr>
              {props.ingredients?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link href={`/ingredients/${item.id}`}>
                        <a>{item.name}</a>
                      </Link>
                    </td>
                    <td>{item.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ScrollableTabsButtonAuto
          info={props.info}
          indication={props.indication}
          contraindication={props.contraindication}
          direction={props.direction}
          interaction={props.interaction}
          preservation={props.preservation}
          overdose={props.overdose}
          pharmacodynamics={props.pharmacodynamics}
          pharmacokinetics={props.pharmacokinetics}
          labelInfo={t('info_label')}
          labelIndication={t('indication_label')}
          labelContraindion={t('contraindication_label')}
          labelDirection={t('user_manual')}
          labelInteraction={t('interaction_label')}
          labelPreservation={t('preservation_label')}
          labelOverdose={t('overdose_label')}
          labelPharmacodynamics={t('pharmacodynamics_label')}
          labelPharmacokinetics={t('pharmacokinetics_label')}
        />
      </div>
    </div>
  );
};
export default ProducerInformation;
