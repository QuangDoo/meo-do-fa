import { useQuery } from '@apollo/client';
import { GET_CITIES } from 'src/graphql/address/getCities';

export default function useCity() {
  const { data } = useQuery(GET_CITIES);

  return data?.getCities;
}
