import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Select from 'src/components/Form/Select';

export default function Sort() {
  const { t } = useTranslation(['productsSidebar']);

  const [isSort, setIsSort] = useState(true);

  const router = useRouter();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsSort(false);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort: event.target.value
      }
    });
  };

  useEffect(() => {
    if (!router.query.sort) {
      setIsSort(true);
    }
  }, [router]);

  return (
    <>
      <div className="products__filter-header mb-2">{t('productsSidebar:sort')}</div>

      <Select onChange={handleSortChange} defaultValue="00">
        {/* <option value="01">Sản phẩm mới</option> */}
        {/* <option value="02">Bán chạy nhất</option> */}
        <option value="00">{t('productsSidebar:all')}</option>
        <option value="04">{t('productsSidebar:price_high_to_low')}</option>
        <option value="05">{t('productsSidebar:price_low_to_high')}</option>
        <option value="06">{t('productsSidebar:name_z_to_a')}</option>
        <option value="07">{t('productsSidebar:name_a_to_z')}</option>
      </Select>
    </>
  );
}
