// Remove nulls from address

import clsx from 'clsx';

type Address = {
  street: string;
  ward: string;
  district: string;
  city: string;
};

export default function getAddressString(address: Address) {
  return clsx(
    address.street,
    address.ward && ', ' + address.ward,
    address.district && ', ' + address.district,
    address.city && ', ' + address.city
  );
}
