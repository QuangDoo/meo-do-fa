import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

type Query = ParsedUrlQuery

// Update the query on page url without reloading the page

const useUpdateQuery = () => {
  const router = useRouter()

  const updateQuery = (newQuery: Query) => {
    // Merge new queries with current queries
    const updatedQuery = { ...router.query, ...newQuery }

    // Delete undefined queries
    Object.keys(updatedQuery).forEach(
      (name) => newQuery[name] === undefined && delete updatedQuery[name]
    )

    // Apply queries to current path with shallow routing
    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
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
