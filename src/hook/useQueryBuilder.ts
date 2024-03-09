import { useEffect, useState } from 'react'

interface QueryParams {
  page: number
  search?: string
  where_clause?: Record<string, unknown>
  sort?: string
  sort_order?: string
  show?: number
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const useQueryBuilder = ({ page, search, where_clause, sort, sort_order, show }: QueryParams): string => {
  const [formattedQuery, setFormattedQuery] = useState<string>('')

  // function will take where_clause as params will return with where_fields and where_values
  const whereClauseString = (obj: Record<string, unknown>): string => {
    // below line will return array after filtering undefinde, empty string and null value
    const query = obj != null ? Object.entries(obj).filter(item => item[1] !== undefined && item[1] !== '' && item[1] !== null) : []
    const queryConvertToObj = query.length > 0 && Object.fromEntries(query)
    const keysArr = Object.keys(queryConvertToObj)
    const valueArr = Object.values(queryConvertToObj)
    return valueArr?.length > 0 ? `where_clause=${JSON.stringify({ where_fields: keysArr, where_values: valueArr })}` : ''
  }

  useEffect(() => {
    const formattedSearch = (search != null && search !== '') ? `search="${search}"` : ''
    const formattedWhereClause = where_clause != null ? whereClauseString(where_clause) : ''
    const formattedSort = (sort != null && sort !== '') ? `sort="${sort}"` : ''
    const formattedSortOrder = (sort_order != null && sort_order !== '') ? `sort_order="${sort_order}"` : ''

    const queryParams = []
    if (page !== 0) queryParams.push(`page=${page}`)
    if (formattedSearch.length > 0) queryParams.push(formattedSearch)
    if (formattedWhereClause.length > 0) queryParams.push(formattedWhereClause)
    if (formattedSort.length > 0) queryParams.push(formattedSort)
    if (formattedSortOrder.length > 0) queryParams.push(formattedSortOrder)
    if (show !== 0 && show != null) queryParams.push(`show=${show}`)

    const formattedQueryString = queryParams.join('&')

    setFormattedQuery(formattedQueryString)
  }, [page, search, where_clause, sort, sort_order, show])

  return formattedQuery
}

export default useQueryBuilder