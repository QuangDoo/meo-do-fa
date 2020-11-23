import React from 'react';
import { GetIngredientDetailsData } from 'src/graphql/ingredient/ingredient.query';

import TabContent from './TabContent';
import Tabs from './Tabs';

type Label = {
  labelInfo: string;
  labelIndication: string;
  labelContraindion: string;
  labelDirection: string;
  labelInteraction: string;
  labelPreservation: string;
  labelOverdose: string;
  labelPharmacodynamics: string;
  labelPharmacokinetics: string;
};

export default function Tab(props, label: Label) {
  return (
    <div className="col-12 col-sm-9 product__details">
      <Tabs>
        <TabContent label={label.labelInfo}>
          {props.info !== 'false' ? props.info : 'Đang cập nhật'}
        </TabContent>
        <TabContent label={label.labelIndication}>
          {props.indication !== 'false' ? props.indication : 'Đang cập nhật'}
        </TabContent>
        <TabContent label={label.labelContraindion}>
          {props.contraindication !== 'false' ? props.contraindication : 'Đang cập nhật'}
        </TabContent>
        <TabContent label={label.labelDirection}>
          {props.direction !== 'false' ? props.direction : 'Đang cập nhật'}
        </TabContent>
        <TabContent label={label.labelInteraction}>
          {props.interaction !== 'false' ? props.interaction : 'Đang cập nhật'}
        </TabContent>
        <TabContent label={label.labelPreservation}>
          {props.preservation !== 'false' ? props.preservation : 'Đang cập nhật'}
        </TabContent>
        <TabContent label={label.labelOverdose}>
          {props.overdose !== 'false' ? props.overdose : 'Đang cập nhật'}
        </TabContent>
        <TabContent label={label.labelPharmacodynamics}>
          {props.pharmacodynamics !== 'false' ? props.pharmacodynamics : 'Đang cập nhật'}
        </TabContent>
        <TabContent label={label.labelPharmacokinetics}>
          {props.pharmacokinetics !== 'false' ? props.pharmacokinetics : 'Đang cập nhật'}
        </TabContent>
      </Tabs>
    </div>
  );
}
