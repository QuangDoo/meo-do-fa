import { useTranslation } from 'i18n';
import React from 'react';

const ProuductDetailImage = (props): JSX.Element => {
  const { t } = useTranslation('productDetail');
  return (
    <div className="col-12">
      <div className="d-flex justify-content-between mb-2">
        <div className="flex-grow-1">
          <div
            className="lozad product__image"
            style={{
              backgroundImage: `url(${props.imageUrl})`
            }}
          />
        </div>
      </div>
      <small className="text-muted">* {t('image_change')}</small>
    </div>
  );
};
export default ProuductDetailImage;
