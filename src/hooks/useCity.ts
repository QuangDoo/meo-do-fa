import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useCityContext } from 'src/contexts/Cities';
import { GET_CITIES } from 'src/graphql/address/city.query';

export default function useCity() {
  const [getCity, { data, error, loading }] = useLazyQuery(GET_CITIES);

  const { setCity } = useCityContext();

  useEffect(() => {
    getCity();
  }, [getCity]);

  useEffect(() => {
    if (data && setCity) {
      setCity(data.getCities);
    }
  }, [data]);

  return {
    getCity,
    data,
    loading,
    error
  };
}
