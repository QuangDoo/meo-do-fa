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
  wardId: number;
  onGetCitiesCompleted?: (data: GetCitiesData) => void;
  onGetDistrictsCompleted?: (data: GetDistrictsData) => void;
  onGetWardsCompleted?: (data: GetWardsData) => void;
  onCityIdChange?: (cityId: number) => void;
  onDistrictIdChange?: (districtId: number) => void;
  onWardIdChange?: (wardId: number) => void;
};

export default function useAddress(props: Props) {
  const { cityId, districtId, wardId } = props;

  const { data: citiesData } = useQuery<GetCitiesData, undefined>(GET_CITIES, {
    onCompleted: (data) => {
      props.onGetCitiesCompleted?.(data);
    }
  });

  const [getDistricts, { data: districtsData }] = useLazyQuery<GetDistrictsData, GetDistrictsVars>(
    GET_DISTRICTS,
    {
      onCompleted: (data) => {
        props.onGetDistrictsCompleted?.(data);
      }
    }
  );

  const [getWards, { data: wardsData }] = useLazyQuery<GetWardsData, GetWardsVars>(GET_WARDS, {
    onCompleted: (data) => {
      props.onGetWardsCompleted?.(data);
    }
  });

  useEffect(() => {
    getDistricts({
      variables: {
        city_id: cityId
      }
    });

    props.onCityIdChange?.(cityId);
  }, [cityId]);

  useEffect(() => {
    getWards({
      variables: {
        district_id: districtId
      }
    });

    props.onDistrictIdChange?.(districtId);
  }, [districtId]);

  useEffect(() => {
    props.onWardIdChange?.(wardId);
  }, [wardId]);

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
