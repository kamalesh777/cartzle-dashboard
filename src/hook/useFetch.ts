import API from '@services/API'
import useSWR from 'swr'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useFetch(apiUrl: string) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetcher = async () => {
    try {
      const response = await API.get(apiUrl)
      const data = await response.data
      return data
    } catch (err) {
      return err
    }
  }
  const { data, error, isLoading = true } = useSWR(apiUrl, fetcher, { revalidateOnFocus: false })

  return {
    results: data?.results,
    resultInfo: data?.resultInfo,
    data: data,
    error,
    isLoading,
  }
}

export default useFetch
