import { useLazyQuery, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  GET_PRODUCT_HOT_TAGS,
  GetProductHotTags
} from 'src/graphql/product-tags/getProductHotTags';

function HotTags() {
  const { t } = useTranslation(['error', 'navbar']);
  const router = useRouter();
  const { data: hotTagsData } = useQuery<GetProductHotTags, undefined>(GET_PRODUCT_HOT_TAGS, {
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });
  const hotTags = hotTagsData?.getProductHotTags;

  if (hotTags?.length === 0) return null;

  return (
    <div className="row my-1 d-none d-md-block">
      <div className="col-12 d-flex align-items-center">
        <span className="rockland-nav__title mx-3">{t('navbar:most_searched')}</span>

        {hotTags?.map(({ id, name, type }) => {
          return (
            <Link
              key={id}
              href={{
                pathname: '/products',
                query: {
                  searchtag: type,
                  search: name
                }
              }}>
              <a
                className={clsx(
                  'hottag-button',
                  name === router.query.search && type === router.query.searchtag && 'active'
                )}>
                #{name}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HotTags;
