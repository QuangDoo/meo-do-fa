import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import SelectWithLabel from 'src/components/Form/SelectWithLabel';
import { useUser } from 'src/contexts/User';
import { City, GET_CITIES, GetCitiesData } from 'src/graphql/address/getCities';
import {
  District,
  GET_DISTRICTS,
  GetDistrictsData,
  GetDistrictsVars
} from 'src/graphql/address/getDistricts';
import { GET_WARDS, GetWardsData, GetWardsVars, Ward } from 'src/graphql/address/getWards';

export default function AddressSelect() {
  const { register, watch, setValue } = useFormContext();

  const { t } = useTranslation(['myAccount', 'common']);

  // User data
  const { data: user } = useUser();

  // Cities array
  const [cities, setCities] = useState<City[]>([]);

  // Districts array
  const [districts, setDistricts] = useState<District[]>([]);

  // Wards array
  const [wards, setWards] = useState<Ward[]>([]);

  // Get cities
  // We use refetch because it returns a Promise
  const { refetch: getCities } = useQuery<GetCitiesData, undefined>(GET_CITIES, {
    skip: true, // Don't query automatically
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.log('Get cities err:', error);
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  // Get districts
  // We use refetch because it returns a Promise
  const { refetch: getDistricts } = useQuery<GetDistrictsData, GetDistrictsVars>(GET_DISTRICTS, {
    skip: true, // Don't query automatically
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.log('Get districts error:', error);
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  // Get wards
  // We use refetch because it returns a Promise
  const { refetch: getWards } = useQuery<GetWardsData, GetWardsVars>(GET_WARDS, {
    skip: true, // Don't query automatically
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.log('Get wards error:', error);
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  // Selected city value
  const selectedCity = watch('companyCity');

  // Selected district value
  const selectedDistrict = watch('companyDistrict');

  // On user load
  useEffect(() => {
    // Always get cities, regardless if user has contact address or not
    getCities().then((response) => {
      setCities(response.data.getCities);

      // If user has contact address, set city value to user's city
      if (user?.contact_address) {
        const { city } = user.contact_address;

        setValue('companyCity', city.name + '__' + city.id);
      }
    });

    // Abort from now on if user doesn't have contact address
    if (!user?.contact_address) return;

    // Get user's city, district and ward
    const { city, district, ward } = user.contact_address;

    // Get districts of user's city then set district value to user's district
    getDistricts({
      city_id: city.id
    }).then((response) => {
      setDistricts(response.data.getDistricts);
      setValue('companyDistrict', district.name + '__' + district.id);
    });

    // Get wards of user's districts then set ward value to user's ward
    getWards({
      district_id: district.id
    }).then((response) => {
      setWards(response.data.getWards);
      setValue('companyWard', ward.name + '__' + ward.id);
    });
  }, [user]);

  // On city change
  const handleCityChange = (event) => {
    // City value format: cityName__cityId
    // Split the value by '__' to get cityName and cityId
    // We don't use cityName here so we don't destructure it
    const [, cityId] = event.target.value.split('__');

    // Reset district and ward value
    setValue('companyDistrict', '');
    setValue('companyWard', '');

    // Clear district and ward data
    setDistricts([]);
    setWards([]);

    // Get districts of the selected city
    getDistricts({
      city_id: +cityId
    }).then((response) => {
      setDistricts(response.data.getDistricts);
    });
  };

  // On district change
  const handleDistrictChange = (event) => {
    // District value format: districtName__districtId
    // Split the value by '__' to get districtName and districtId
    // We don't use districtName here so we don't destructure it
    const [, districtId] = event.target.value.split('__');

    // Reset ward value
    setValue('companyWard', '');

    // Clear ward data
    setWards([]);

    // Get wards of the selected district
    getWards({
      district_id: +districtId
    }).then((response) => {
      setWards(response.data.getWards);
    });
  };

  return (
    <div className="row">
      <SelectWithLabel
        onChange={handleCityChange}
        name="companyCity"
        ref={register({
          required: t('myAccount:company_city_required') + ''
        })}
        containerClass="col-md-4"
        required
        label={t('common:city_select_label')}>
        <option value="">{t('common:city_select_placeholder')}</option>

        {cities.map(({ id, name }) => (
          <option key={id} value={name + '__' + id}>
            {name}
          </option>
        ))}
      </SelectWithLabel>

      <SelectWithLabel
        onChange={handleDistrictChange}
        name="companyDistrict"
        ref={register({
          required: t('myAccount:company_district_required') + ''
        })}
        containerClass="col-md-4"
        required
        label={t('common:district_select_label')}
        disabled={!districts.length || !selectedCity}>
        <option value="">{t('common:district_select_placeholder')}</option>

        {districts.map(({ id, name }) => (
          <option key={id} value={name + '__' + id}>
            {name}
          </option>
        ))}
      </SelectWithLabel>

      <SelectWithLabel
        name="companyWard"
        ref={register({
          required: t('myAccount:company_ward_required') + ''
        })}
        containerClass="col-md-4"
        required
        label={t('common:ward_select_label')}
        disabled={!wards.length || !selectedCity || !selectedDistrict}>
        <option value="">{t('common:ward_select_placeholder')}</option>

        {wards.map(({ id, name }) => (
          <option key={id} value={name + '__' + id}>
            {name}
          </option>
        ))}
      </SelectWithLabel>
    </div>
  );
}
