import slugify from '@sindresorhus/slugify';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import ScrollableTabsButtonAuto from 'src/components/Modules/ScrollableTabsButtonAuto/ScrollableTabsButtonAuto';
import { ProductDetail } from 'src/graphql/product/product.query';

const ProducerInformation = (props: ProductDetail) => {
  const { t } = useTranslation(['ingredientDetails']);

  const handleCheck = (props) => {
    if (!props) return;
    const isData = ['<p><br></p>', 'false', null].some((string) => props.includes(string));

    return isData;
  };

  return (
    <div>
      <div hidden={props.ingredients?.length === 0}>
        <div className="product__info-label">{t('ingredient')}</div>
        <table className="table table-bordered table-sm">
          <tbody>
            <tr>
              <th>{t('name')}</th>
              <th>{t('concentrations')}</th>
            </tr>
            {props.ingredients?.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link href={`/ingredients/${item.ingredient_id}/${slugify(item.name)}`}>
                    <a>{item.name}</a>
                  </Link>
                </td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <ScrollableTabsButtonAuto
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
        init={0}
      /> */}
      {handleCheck(props.indication) || handleCheck(props.contraindication) ? null : (
        <ScrollableTabsButtonAuto
          indication={props.indication}
          contraindication={props.contraindication}
          labelIndication={t('indication_label')}
          labelContraindion={t('contraindication_label')}
          init={1}
          vari="fullWidth"
        />
      )}

      {handleCheck(props.direction) || handleCheck(props.interaction) ? null : (
        <ScrollableTabsButtonAuto
          direction={props.direction}
          interaction={props.interaction}
          labelDirection={t('user_manual')}
          labelInteraction={t('interaction_label')}
          init={3}
          vari="fullWidth"
        />
      )}
      {handleCheck(props.preservation) || handleCheck(props.overdose) ? null : (
        <ScrollableTabsButtonAuto
          preservation={props.preservation}
          overdose={props.overdose}
          labelPreservation={t('preservation_label')}
          labelOverdose={t('overdose_label')}
          init={5}
          vari="fullWidth"
        />
      )}
      {handleCheck(props.pharmacodynamics) || handleCheck(props.pharmacokinetics) ? null : (
        <ScrollableTabsButtonAuto
          pharmacodynamics={props.pharmacodynamics}
          pharmacokinetics={props.pharmacokinetics}
          labelPharmacodynamics={t('pharmacodynamics_label')}
          labelPharmacokinetics={t('pharmacokinetics_label')}
          init={7}
          vari="fullWidth"
        />
      )}
    </div>
  );
};
export default ProducerInformation;
