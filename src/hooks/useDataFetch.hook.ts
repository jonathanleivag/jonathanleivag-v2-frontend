import { useEffect, useState } from 'react'
import type { useDataFetchResponse } from '../type'
import { useStore } from '@nanostores/react'
import { isLanguage } from '../store'

export const useDataFetch = <T>(
  router: string,
  isLang: boolean = true
): useDataFetchResponse<T> => {
  const $lang = useStore(isLanguage)
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const [data, setData] = useState<T>({} as T)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true)

        const url: string = isLang
          ? `/api/content/${router}/${$lang}`
          : `/api/content/${router}`

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const jsonData: T = await response.json()

        setData(jsonData)
        setIsLoading(false)
        setError(null)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
      }
    }

    void fetchData()
    return () => {}
  }, [$lang])

  return [data, isLoading, error]
}
