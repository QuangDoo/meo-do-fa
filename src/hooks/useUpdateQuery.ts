import { useRouter } from 'next/router'

const useUpdateQuery = () => {
  const router = useRouter()

  const updateQuery = (newQuery) => {
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      {
        shallow: true,
      }
    )
  }

  return updateQuery
}

export default useUpdateQuery
