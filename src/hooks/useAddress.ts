import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_CITIES, GetCitiesData } from 'src/graphql/address/getCities';
import {
  GET_DISTRICTS,
  GetDistrictsData,
  GetDistrictsVars
} from 'src/graphql/address/getDistricts';
import { GET_WARDS, GetWardsData, GetWardsVars } from 'src/graphql/address/getWards';

type Props = {
  cityId: number;
  districtId: number;
};

export default function useAddress(props: Props) {
  const { cityId, districtId, wardId } = props;

  const { data: citiesData } = useQuery<GetCitiesData, undefined>(GET_CITIES);

  const [getDistricts, { data: districtsData }] = useLazyQuery<GetDistrictsData, GetDistrictsVars>(
    GET_DISTRICTS
  );

  const [getWards, { data: wardsData }] = useLazyQuery<GetWardsData, GetWardsVars>(GET_WARDS);

  useEffect(() => {
    getDistricts({
      variables: {
        city_id: cityId
      }
    });
  }, [cityId]);

  useEffect(() => {
    getWards({
      variables: {
        district_id: districtId
      }
    });
  }, [districtId]);

  const cities = citiesData?.getCities || [];

  const districts = districtsData?.getDistricts || [];

  const wards = wardsData?.getWards || [];

  return {
    cities,
    districts,
    wards,
    chosenCity: cities.find((city) => city.id === cityId),
    chosenDistrict: districts.find((district) => district.id === districtId),
    chosenWard: wards.find((ward) => ward.id === wardId)
  };
}
