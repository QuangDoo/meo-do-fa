import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Category } from 'src/graphql/category/category.query';
import { Manufacturer } from 'src/graphql/manufacturers/manufacturers.query';

import Dropdown from '../../Form/Dropdown';
import Select from '../../Form/Select';

type Props = {
  categories: Category[];
  manufacturers: Manufacturer[];
};

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto',
    padding: '20px'
  }
});

const TemporaryDrawer = (props: Props) => {
  const { categories, manufacturers } = props;
  const { t } = useTranslation(['productsSidebar']);
  const router = useRouter();
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false
  });

  const toggleDrawer = (anchor: 'top', open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: 'top') => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <header className="products__filters-header">
        <span className="text-muted icomoon icon-tune mr-3" />
        {t('search_filters')}
      </header>

      <hr className="hr my-3" />

      <Dropdown label={t('category')}>
        <div className="mb-2">
          <Link href="/products">
            <a className={clsx('products__filter-category', !router.query.category && 'active')}>
              {t('all')}
            </a>
          </Link>
        </div>

        {categories
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ name, id }) => (
            <div key={id} className="mb-2">
              <Link href={`/products?category=${id}`}>
                <a
                  className={clsx(
                    'products__filter-category',
                    router.query.category === id.toString() && 'active'
                  )}>
                  {name}
                </a>
              </Link>
            </div>
          ))}
      </Dropdown>

      <hr className="hr my-3" />

      <Dropdown label={t('manufacturer')}>
        <div className="mb-2">
          <Link href="/products">
            <a
              className={clsx('products__filter-category', !router.query.manufacturer && 'active')}>
              {t('all')}
            </a>
          </Link>
        </div>

        {manufacturers
          .slice()
          .sort((a, b) => a.short_name.localeCompare(b.short_name))
          .map(({ short_name, id }) => (
            <div key={id} className="mb-2">
              <Link href={`/products?manufacturer=${id}`}>
                <a
                  className={clsx(
                    'products__filter-category',
                    router.query.manufacturer === id.toString() && 'active'
                  )}>
                  {short_name}
                </a>
              </Link>
            </div>
          ))}

        <div>
          <Link href="/manufacturers">
            <a className="products__filter-category">{t('see_more')}</a>
          </Link>
        </div>
      </Dropdown>
    </div>
  );

  return (
    <div>
      <React.Fragment key={'top'}>
        <Button
          onClick={toggleDrawer('top', true)}
          variant="contained"
          color="primary"
          style={{ borderRadius: '50px' }}>
          <i className="fas fa-filter mr-1"></i>
          {t('productsSidebar:filter')}
        </Button>

        <Drawer anchor={'top'} open={state['top']} onClose={toggleDrawer('top', false)}>
          {list('top')}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default TemporaryDrawer;
